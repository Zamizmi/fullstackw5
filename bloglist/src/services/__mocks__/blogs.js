let token = null

const blogs = [
    {
        id: "5a899116a364382d8156e64d",
        title: "Turusta Itään",
        author: "Timo Tei",
        url: "www.ruusu.fi",
        likes: 2,
        user: {
            _id: "5a857c30a364312d8156e64b",
            username: "Juhaniz",
            name: "Juhani"
        },
    },
    {
        id: "5a857c30a364312d8156e64b",
        title: "Hangosta Länteen",
        author: "Halonen",
        url: "www.hanko.com",
        likes: 5,
        user: {
            _id: "5aa97c50a314382d5658g64a",
            username: "Kekkonen",
            name: "UKK"
        },
    },
    {
        id: "5a89464ca113386d82d6e15j",
        title: "Lapin Kulta",
        author: "Reima",
        url: "www.lappari.fi",
        likes: 8,
        user: {
            _id: "5a857c30a364312d8156e64b",
            username: "Juhaniz",
            name: "Juhani"
        },
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }
