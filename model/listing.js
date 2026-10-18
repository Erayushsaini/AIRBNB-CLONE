const db=require("../config/db");



let DEFAULT_IMG="https://images.unsplash.com/photo-1790848947579-b7f050545ddf?fm=jpg&q=80&w=1171";
//method to findall 

const Listings = {
    async findAll() {
        const [rows]=await db.execute(
            "SELECT *FROM listings"
        );
        return rows;
    },
    async findbyId(id) {
        [row]=await db.execute(
            "SELECT *FROM listings WHERE id=? ",
            [id]
        );

        return row[0];
    },
    async create(listing) {
        const {
            title,
            description,
            image,
            price,
            location,
            country
        } = listing;

        const finalImage = image?.trim() || DEFAULT_IMG;
        const [result] = await db.execute(
            `INSERT INTO listings
            (title, description, image, price, location, country)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description, finalImage, price, location, country]
        );

        return result.insertId;
    },
    async deleteAll() {
        const [result] = await db.execute(
            "DELETE FROM listings"
        );
        return result.affectedRows;
    },


    async InsertMany(data) {
        const value= data.map(val => {
            const finalImage = val.image?.trim() || DEFAULT_IMG;

            return [
            val.title,
            val.description,
            finalImage,
            val.price,
            val.location,
            val.country
            ];
        });
        const [result] = await db.query(
            `INSERT INTO listings
            (title, description, image, price, location, country)
            VALUES ?`,
            [value]
        );
        return result.affectedRows;
    },

    async findByIdAndUpdate(id, listing) {
        const {
            title,
            description,
            image,
            price,
            location,
            country
        } = listing;

        const [result] = await db.execute(
            `UPDATE listings
            SET title = ?,
                description = ?,
                image = ?,
                price = ?,
                location = ?,
                country = ?
            WHERE id = ?`,
            [
                title,
                description,
                image,
                price,
                location,
                country,
                id
            ]
        );

        return result.affectedRows;
    },
    async findByIdAndDelete(id) {
        const [result] = await db.execute(
            "DELETE FROM listings WHERE id = ?",
            [id]
        );

        return listing;
    }
};

module.exports=Listings;

