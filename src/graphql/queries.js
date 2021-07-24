/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFavoriteInfo = /* GraphQL */ `
  query GetFavoriteInfo($stockIds: String) {
    getFavoriteInfo(stockIds: $stockIds) {
      data {
        price
        rate
        stockId
      }
    }
  }
`;
export const getFinancialInfo = /* GraphQL */ `
  query GetFinancialInfo($stockId: String) {
    getFinancialInfo(stockId: $stockId) {
      data {
        date
        nProfit
        npGrowth
        npMargin
        oMargin
        oProfit
        opGrowth
        rGrowth
        rv
      }
      formatKR {
        date
        nProfitKR
        oProfitKR
        rvKR
      }
    }
  }
`;
export const getMainInfo = /* GraphQL */ `
  query GetMainInfo($keyword: String) {
    getMainInfo(keyword: $keyword) {
      global {
        changePrice
        changeRate
        name
        tradePrice
      }
      kr {
        changePrice
        changeRate
        name
        tradePrice
      }
      reports {
        date
        tradePrice
        yield
        priceGoal
        reportIdx
        reportName
        stockId
        stockName
      }
    }
  }
`;
export const getSectorInfo = /* GraphQL */ `
  query GetSectorInfo($sectorName: String, $startDate: String) {
    getSectorInfo(sectorName: $sectorName, startDate: $startDate) {
      avgYield
      stockList {
        changePrice
        changeRate
        count
        expYield
        priceAvg
        sSector
        score
        stockId
        stockName
        tradePrice
      }
      top3List {
        first
        firstYield
        second
        secondYield
        third
        thirdYield
      }
    }
  }
`;
export const getStockInfo = /* GraphQL */ `
  query GetStockInfo($startDate: String, $stockId: String) {
    getStockInfo(startDate: $startDate, stockId: $stockId) {
      changePrice
      changeRate
      code
      companySummary
      expYield
      foreignRatio
      high52wPrice
      highPrice
      invStatistics {
        date
        inKR {
          foreign
          individual
          institutions
        }
        inVal {
          foreign
          individual
          institutions
        }
      }
      low52wPrice
      lowPrice
      marketCap
      name
      news {
        date
        description
        link
        title
      }
      newsTitles
      openingPrice
      pastData {
        date
        end
        high
        low
        start
        volume
      }
      pbr
      per
      priceAvg
      reportList {
        analyst
        date
        firm
        priceGoal
        reportIdx
        reportName
      }
      roe
      score
      tradePrice
      wicsSectorName
    }
  }
`;
