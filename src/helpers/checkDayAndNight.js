function checkDayAndNight(timestamp){
    const day = new Date(timestamp * 1000)

return day.getHours() >= 7 && day.getHours() <= 19;

}

export default checkDayAndNight