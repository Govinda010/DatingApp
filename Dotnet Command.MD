## Dotnet Command
1.  dotnet --info : to check version of dotnet
2.  dotnet new -h : get help to about new project
3.  dotnet new sln : Create the solution file
4.  dotnet new webapi -o API : Create the webapi project at output folder call API
5.  dotnet sln add API : Add API to solution folder
6.  dotnet dev-certs https --trust : to allow https
7.  dotnet dev-certs https --clear : to clean https
8.  dotnet run -lp https : load profile of https form lunchSetting.json
9.  dotnet tool list
10. dotnet tool update --global dotnet-ef --version 7.0.0
11. dotnet ef migrations add InitialCreate -o .\Data\Migrations
12. dotnet ef database update