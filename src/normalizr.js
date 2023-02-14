const { normalize, denormalize, schema } = require('normalizr');

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'id' });
const messageSchema = new schema.Entity('mensaje', { author: authorSchema });

const chat = new schema.Entity('chat', {
    author: authorSchema,
    text: [messageSchema]
}, { idAttribute: "id" })

const chatSchema = new schema.Array(chat);

const normalizeData = (data) => {
    const normalizedMessages = normalize(data, [chatSchema]);
    console.log("Array con chats normalizados: ", normalizedMessages)
    return normalizedMessages;
}

const denormalizeData = (data) => {
    const dataDenormalizada = denormalize(data.result, chatSchema, data.entities)
    return dataDenormalizada;
}

module.exports = {
    normalizeData,
    denormalizeData,    
}