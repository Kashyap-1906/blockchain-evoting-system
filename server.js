const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const { ethers } = require("ethers");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));

// ================= DATABASE CONNECTION =================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kashyap1906*",
    database: "evoting"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database ✅");
    }
});

// ================= BLOCKCHAIN SETUP =================

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

const privateKey = "0xe491c04ab12125b1ffd1faf70d915d8653a92bce3b284ef5d96b887cd7bc901f";

const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = "0x866b7d41da021C9D072ccC02f5ac4934864Db6fF";

const contractABI = JSON.parse(fs.readFileSync("voting_abi.json"));

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// ================= ADMIN ROUTES =================

// 🔥 ADD VOTER WITH SAFE FACE DUPLICATE CHECK
app.post("/add-voter", (req, res) => {

    const { voterId, faceData } = req.body;

    if (!voterId || !faceData) {
        return res.json({ error: "Voter ID and Face Data required ❌" });
    }

    let newDescriptor;

    try {
        newDescriptor = JSON.parse(faceData);
    } catch {
        return res.json({ error: "Invalid face data ❌" });
    }

    // 1️⃣ Check Face Duplicate
    db.query("SELECT voterId, faceData FROM voters", (err, rows) => {

        if (err) return res.json({ error: "Database error ❌" });

        for (let row of rows) {

            // Skip null faces
            if (!row.faceData) continue;

            let existing;
            try {
                existing = JSON.parse(row.faceData);
            } catch {
                continue;
            }

            if (!existing || !Array.isArray(existing)) continue;

            let sum = 0;
            for (let i = 0; i < existing.length; i++) {
                sum += Math.pow(existing[i] - newDescriptor[i], 2);
            }

            const distance = Math.sqrt(sum);

            if (distance < 0.5) {
                return res.json({ error: "Face already registered ❌" });
            }
        }

        // 2️⃣ Insert if face unique
        db.query(
            "INSERT INTO voters (voterId, hasVoted, faceData) VALUES (?, false, ?)",
            [voterId, faceData],
            (err2) => {

                if (err2) {

                    if (err2.code === "ER_DUP_ENTRY") {
                        return res.json({ error: "Voter ID already exists ❌" });
                    }

                    return res.json({ error: "Insert error ❌" });
                }

                res.json({ success: "Voter Registered Successfully ✅" });
            }
        );

    });
});

// ================= GET VOTERS =================

app.get("/voters", (req, res) => {
    db.query("SELECT voterId, hasVoted FROM voters", (err, result) => {
        if (err) return res.json({ error: "Error fetching voters ❌" });
        res.json(result);
    });
});

// ================= DELETE VOTER =================

app.delete("/delete-voter/:id", (req, res) => {
    db.query("DELETE FROM voters WHERE voterId = ?", [req.params.id], (err) => {
        if (err) return res.json({ error: "Error deleting voter ❌" });
        res.json({ success: "Deleted ✅" });
    });
});

// ================= ADD CANDIDATE =================

app.post("/add-candidate", (req, res) => {

    const { name } = req.body;

    if (!name) {
        return res.json({ error: "Candidate name required ❌" });
    }

    db.query("INSERT INTO candidates (name) VALUES (?)", [name], (err) => {
        if (err) return res.json({ error: "Error adding candidate ❌" });
        res.json({ success: "Candidate added ✅" });
    });
});

// ================= GET CANDIDATES =================

app.get("/candidates", (req, res) => {
    db.query("SELECT * FROM candidates", (err, result) => {
        if (err) return res.json({ error: "Error fetching candidates ❌" });
        res.json(result);
    });
});

// ================= DELETE CANDIDATE =================

app.delete("/delete-candidate/:id", (req, res) => {
    db.query("DELETE FROM candidates WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.json({ error: "Error deleting candidate ❌" });
        res.json({ success: "Deleted ✅" });
    });
});

// ================= GET VOTER FACE =================

app.get("/voter-face/:id", (req, res) => {

    db.query(
        "SELECT voterId,imagePath, hasVoted FROM voters WHERE voterId = ?",
        [req.params.id],
        (err, result) => {

            if (err) return res.json({ error: "Database error ❌" });

            if (result.length === 0) {
                return res.json({ error: "Voter not found ❌" });
            }

            res.json({
                imagePath: result[0].imagePath,
                hasVoted: result[0].hasVoted
            });
        }
    );
});

// ================= VOTING =================

app.post("/vote", async (req, res) => {

    const { voterId, candidateId } = req.body;

    if (!voterId || !candidateId) {
        return res.json({ error: "Voter ID and Candidate ID required ❌" });
    }

    db.query("SELECT * FROM voters WHERE voterId = ?", [voterId], async (err, result) => {

        if (err) return res.json({ error: "Database error ❌" });

        if (result.length === 0) {
            return res.json({ error: "Voter not found ❌" });
        }

        if (result[0].hasVoted) {
            return res.json({ error: "Already voted ❌" });
        }

        try {

    const token = voterId;
    console.log("Generated Token:",token);

    const tx = await contract.castVote(
        token,
        parseInt(candidateId),
        "HYD-01"
    );

    /* WAIT FOR BLOCKCHAIN CONFIRMATION */
    const receipt = await tx.wait();

    db.query("UPDATE voters SET hasVoted = true WHERE voterId = ?", [voterId]);

    /* SEND TX HASH */

    res.json({
        success: "Vote recorded on Blockchain ✅",
        txId: receipt.hash
    });

} catch (error) {
    console.error(error);
    res.json({ error: "Blockchain transaction failed ❌" });
}
    });
});

// ================= START SERVER =================

app.listen(3000, () => {
    console.log("Server started on port 3000 🚀");
});