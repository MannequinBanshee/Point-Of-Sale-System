db.createUser(
    {
        user: "posadmin",
        pwd:  "secret",
        roles: [
            {
                role: "readWrite",
                db: "POS"
            }
        ]
    }
);