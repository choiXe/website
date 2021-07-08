/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSectorInfo = /* GraphQL */ `
  query GetSectorInfo($sectorName: String, $startDate: String) {
    getSectorInfo(sectorName: $sectorName, startDate: $startDate) {
      avgYield
      stockList {
        changeRate
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
