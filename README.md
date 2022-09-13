# Survey Management APIs System

This project is mainly designed for survey managment, user can create the survey, add questions to the survey and send the survey to the targeted audience to understand the survey metrics, considering survey would be mostly conducted via mobile platforms, so mostly the APIs are designed considering in mind about the mobile infrastructre.

<br><br>

## Points considered from assignment document
- Strictly not to use any database
- Any framework can be used
- Javascript / Typescript can be used
- Correct documentation need to be provided

<br><br>

## Note: Due to time constraint few things could not be handled (also not asked in assignment document)
- API security / authentication mechanism
- Code inline documentation
- Error / access log managment

<br><br>

## Technical specifications
- NodeJS - v18

<br><br>

## Development specifications
- OS - Mac
- Editor - VS Code 1.17
- API UI Interface - Postman v9.29.0

<br><br>

## Components built
- Survey CRUD APIs
- Questions CRUD APIs
- Audience (Survey Attendee) APIs

<br><br>

## Postman collection
https://www.getpostman.com/collections/413ea6e92968fea5164d

<br><br>

## API Documentation
https://documenter.getpostman.com/view/2362382/2s7YYsb3V4

<br><br>

## Database Explaination
- As mentioned in the assignment document not to use any database externally, so I have just managed internal file system 
with JSON data storing in them.
- But in real world this solution in terms of file system will not be scable
- For this kind of project we can use SQL or NoSQL database, NoSQL would be more ideal database because survey structure may keep on evolving, so to keep it more flexible database like MongoDB would be the ideal scenario

<br><br>

## Infrastructure Resources (Might be considered for deployment)
- ### Serverless
    - API Gateway, Lambda, Database

- ### Containerization
    - Docker, Kubernetes (Load Balancing), Database

- ### Server Based
    - EC2, PM2, Database
