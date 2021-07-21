import * as queries from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

const getStockInfo = async (id, date) => {
  try {
    const stockInfo = await API.graphql(
      graphqlOperation(queries.getStockInfo, {
        stockId: id,
        startDate: date
      })
    );
    return stockInfo.data;
  } catch (error) {
    return error.data;
  }
};

const getSectorInfo = async (name, date) => {
  try {
    const sectorInfo = await API.graphql(
      graphqlOperation(queries.getSectorInfo, {
        sectorName: name,
        startDate: date
      })
    );
    return sectorInfo.data;
  } catch (error) {
    return error.data;
  }
};

const getMainInfo = async (text) => {
  try {
    const mainInfo = await API.graphql(
      graphqlOperation(queries.getMainInfo, {
        keyword: text
      })
    );
    return mainInfo.data;
  } catch (error) {
    return error.data;
  }
};

const getFavoriteInfo = async (ids) => {
  try {
    const favoriteInfo = await API.graphql(
      graphqlOperation(queries.getFavoriteInfo, {
        stockIds: ids
      })
    );
    return favoriteInfo.data;
  } catch (error) {
    return error.data;
  }
};

const getFinancialInfo = async (id) => {
  try {
    const financialInfo = await API.graphql(
      graphqlOperation(queries.getFinancialInfo, {
        stockId: id
      })
    );
    return financialInfo.data;
  } catch (error) {
    return error.data;
  }
};

const services = {
  getStockInfo,
  getSectorInfo,
  getMainInfo,
  getFavoriteInfo,
  getFinancialInfo
};

export default services;
