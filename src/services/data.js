import * as queries from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const getStockInfo = async (id, date) => {
  try {
    const stockInfo = await API.graphql(
      graphqlOperation(queries.getStockInfo, {
        stockId: id,
        startDate: date,
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
        startDate: date,
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
        keyword: text,
      })
    );
    return mainInfo.data;
  } catch (error) {
    return error.data;
  }
};

const services = { getStockInfo, getSectorInfo, getMainInfo };

export default services;
