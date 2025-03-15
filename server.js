const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
require("./database/connection");

const app = express();

dotenv.config({ path: './config/config.env' });

const { json } = require("express")

const static_path = path.join(__dirname, "./public");

app.use(express.static(static_path))
app.listen(process.env.PORT, () => {
    console.log(`Server Running ${process.env.PORT}`);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const register = require("./model/model");
const Feedback = require("./model/feedback");
const { error } = require("console");

app.post("/signup", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {

            const existingUser = await register.findOne({ email: req.body.email });

            if (existingUser) {
                res.status(400).send("Email already in use!");
            } else {
                const registerEmploye = new register({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    password: password, 
                    confirmpassword: cpassword
                });

                const registered = await registerEmploye.save();
                res.send(`
                <script>
                    alert('Registered successfully');
                    setTimeout(function() {
                        window.location.href = '/index.html';
                    }, 1000); 
                </script>
            `);
            }
        } else {
            res.status(400).send("Sorry, passwords do not match!");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const existingUser = await register.findOne({ email: req.body.email, password: req.body.password });

        if (existingUser) {
            
            res.send(`
                <script>
                    alert('Logged in successfully');
                    setTimeout(function() {
                        window.location.href = '/index.html';
                    }, 1000); // Redirect after 1 second (1000 milliseconds)
                </script>
            `);
        } else {
            res.status(400).send("Account Not Found! Please Register Account");
        }
    } catch (error) {
        console.error("Error occurred during login:", error);
        res.status(500).send("Internal Server Error");
    }

});

app.post("/send", async (req, res) => {
    try {
        const { name, comments } = req.body;  

        const newFeedback = new Feedback({
            name,     
            comments
        });

        await newFeedback.save();

        return res.status(200).send("Feedback sent successfully!");
    } catch (error) {
        console.error("Error while sending feedback:", error);
        return res.status(500).json({ error: "An error occurred." });
    }
});
