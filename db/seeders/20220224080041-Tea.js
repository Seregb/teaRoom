module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
//     await queryInterface.bulkInsert('Teas', [{
//       name: 'Каркаде',
//       description: 'Чай, который часто называют красным из-за яркого цвета настоя. Готовится из цветов гибискуса, не содержит кофеин, зато имеет в своем составе много витамина С. Можно употреблять детям.',
//       place: '123123',
//       img: 'https://koelov.ru/wp-content/uploads/2013/11/gibiskus-krasnyj-chaj-karkade.jpg',
//       isDeleted: false,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
