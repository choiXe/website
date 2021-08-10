# [choiXe](https://www.choixe.app) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/choiXe/choiXe/blob/main/LICENSE)

choiXe is a platform that provides investment information for newbie stock investors.

> Check out [public/screenshots](./public/screenshots) for more!

[![Screenshot](https://github.com/choiXe/website/blob/main/public/screenshots/stock.png)](https://www.choixe.app)

---
# Table of contents
- [What's inside?](#whats-inside)
- [Live Version](#live-version)
- [Local Set Up](#local-set-up)
- [Technologies Used](#technologies-used)
- [License & Copyright Notice](#license--copyright-notice)

## What's inside?

- Navigation Bar
    - **Logo / Company Name**
    - **Quick Navigation Menu** => 1) About 2) Sector 3) Stock 
    - **Search Bar** => Quickly search for any stock with its name
- Home page
    - **Sector Menu** => List of sectors to choose from
    - **Market Index** => Korean / Global market indices
    - **Favorites** => A user's favorite stocks list for easy access
    - **Latest Reports** => List of the most recent analysts' reports
- Sector page
    - **Sector Menu**
    - **Sector Detail** => Treemap, Expected Yield, Top 3 Yields of subsectors
    - **Stock List** => List of stocks under the current big sector and their data overview

- Stock page
    - **Stock Detail** => Expected yield, Candle Chart, **Investment Score**
    - **Investment Stats**
    - **Keywords Wordcloud** => Keywords frequently mentioned with the stock
    - **Investor Trend**
    - **Misc.**
        - *Report* => Analysts' reports about the stock
        - *News* => News list that mentions the stock
        - *Financials* => Profitability & Growth Graph
        - *Profile* => A short company info

- About page
    - A brief Introduction of the **platform** & our **team**

## Live Version
Visit [here!](https://www.choixe.app)

## Local Set Up
* Make sure you have [Node.js](https://nodejs.org/en/download/) installed
* Clone this repo 
```shell
> git clone https://github.com/choiXe/website.git choiXe
```
* `cd` into the repo and install all dependencies
```shell
> cd choiXe
> npm install
```
* Start your own local server and go checkout the [website!](http://localhost:3000)
```shell
> npm start
```

## Technologies Used
- Frontend: React, SASS
- Backend: AWS AppSync, GraphQL API, Lambda, DynamoDB
- Deployment: AWS Amplify

## License & Copyright Notice

This repository has been created as a part of the ongoing development of the [choiXe](https://github.com/choiXe/website) project.

The work in this repository is licensed under the [MIT](https://github.com/choiXe/choiXe/blob/main/LICENSE) license.

Copyright (c) 2021 choiXe team

