module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
      await db.createCollection('users');
    } catch (e) {
      console.log(e);
      await db.dropCollection('users');
      await session.abortTransaction();
      return;
    }
    await session.endSession();
  },

  async down(db, client) {
    await db.dropCollection('users');
  }
};
