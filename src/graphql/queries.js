/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSectorInfo = /* GraphQL */ `
  query GetSectorInfo($sectorName: String, $startDate: String) {
    getSectorInfo(sectorName: $sectorName, startDate: $startDate) {
      avgYield
      stockList {
        cCount
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
      changeRate
      code
      companySummary
      expYield
      foreignRatio
      high52wPrice
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
      marketCap
      name
      news {
        date
        link
        title
      }
      newsTitles
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
      recommend
      reportList {
        date
        reportName
        analyst
        priceGoal
        firm
        reportIdx
      }
      roe
      tradePrice
    }
  }
`;
