const createEmployeeRecord = function (employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  };
  
  const createEmployeeRecords = function (employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
  };
  
  const createTimeInEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date });
    return this;
  };
  
  const createTimeOutEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date });
    return this;
  };
  
  const wagesEarnedOnDate = function (date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payRate = this.payPerHour;
    return hoursWorked * payRate;
  };
  
  const hoursWorkedOnDate = function (date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
  
    const timeIn = timeInEvent.hour;
    const timeOut = timeOutEvent.hour;
  
    const hoursWorked = (timeOut - timeIn) / 100;
    return hoursWorked;
  };
  
  const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);
  
    return payable;
  };
  
  const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  };
  
  const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce((totalPay, employee) => totalPay + allWagesFor.call(employee), 0);
  };