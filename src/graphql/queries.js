/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStockInfo = /* GraphQL */ `
  query GetStockInfo($stockId: String, $startDate: String) {
    getStockInfo(stockId: $stockId, startDate: $startDate) {
      reportList {
        reportName
        firm
        reportIdx
        date
        priceGoal
        analyst
      }
      name
      code
      companySummary
      tradePrice
      changeRate
      marketCap
      high52wPrice
      low52wPrice
      foreignRatio
      per
      pbr
      roe
      priceAvg
      expYield
      recommend
      pastData {
        date
        start
        high
        low
        end
        volume
      }
      invStatistics {
        date
        inKR {
          individual
          foreign
          institutions
        }
        inVal {
          individual
          foreign
          institutions
        }
      }
      news {
        title
        date
        source
        link
      }
      newsTitles
    }
  }
`;
export const getSectorInfo = /* GraphQL */ `
  query GetSectorInfo($sectorName: String, $startDate: String) {
    getSectorInfo(sectorName: $sectorName, startDate: $startDate) {
      stockList {
        stockId
        sSector
        tradePrice
        changeRate
        priceAvg
        expYield
        cCount
        score
      }
      avgYield
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
