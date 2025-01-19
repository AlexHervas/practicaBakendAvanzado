import cote from 'cote'

const requester = new cote.Requester({
    name: 'thumbnail-requester'
})

export const thumbnailRequest = ({ image }) => {
    const event = { 
        type: 'img-added-db',
        image,
    }
    
    requester.send(event, result => {
        console.log(result)
    })
}
