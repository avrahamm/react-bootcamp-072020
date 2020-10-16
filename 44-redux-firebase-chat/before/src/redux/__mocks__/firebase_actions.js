import faker from "faker";

module.exports = {
  sendToFirebase: jest.fn((from, text) => {
    const created_at = new Date();
    const id = faker.random.uuid();
    const newMessage = ({ id, from, text, created_at });
    return { type: 'RECEIVED_MESSAGE', payload: newMessage };
  })
}




