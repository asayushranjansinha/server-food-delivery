module.exports = (model) => {
  let dbModel = model;
  return {
    async create(data) {
      try {
        let response = await dbModel.create(data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async update(updates, filters) {
      try {
        let response = await dbModel.update(updates, { where: filters });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async get(filters, attributes) {
      try {
        let response = await dbModel.findOne({
          where: filters,
          attributes: attributes,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async getAll() {
      try {
        let response = await dbModel.findAll({});
        return response;
      } catch (error) {
        throw error;
      }
    },
    async getMany(filters) {
      try {
        let response = await dbModel.findAll({
          where: filters,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async search() {
      try {
        let response = await dbModel.findAll({
          where: filters,
          order: order,
          attributes: attributes,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async getAllWithOrdered(order, offset, limit) {
      try {
        let response = dbModel.findAll({
          order: order,
          offset: offset,
          limit: limit,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async getAllWithAttributes(filters, attributes, order, limit) {
      try {
        let response = await dbModel.findAll({
          where: filters,
          order: order,
          attributes: attributes,
          limit: limit,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async delete(filters) {
      try {
        let response = await dbModel.destroy({
          where: filters,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
  };
};
