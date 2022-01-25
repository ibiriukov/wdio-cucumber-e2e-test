import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai"

Given(/^Kasa page is opened$/, async function () {
    await browser.url("https://www.kasa.com/")
    await browser.pause(2000)

})

When(/^Search with (.*)$/, async function (searchItem) {
    console.log('>> searchItem: ${searchItem}');
    let ele = await $('#full-screen-hero-search-input') // input field

    await ele.setValue(searchItem) 
})

Then(/^Not allowed book on past date (.*)$/, async function (pastDate) {
    let dateInEle = await $('#full-screen-hero-check-in-input') //check in intput field
    await dateInEle.click()

    await browser.pause(2000)
    
    let ele = await $("//button[@date='"+pastDate+"']");
      
    let val = await ele.getAttribute('disabled');
    chai.expect(val).to.equal('true'); // make sure that element is disabled

})

Then(/^Pick dates$/, async function () {
    var checkinDate = new Date(); // create Date obj for checkin
    var ddIn = checkinDate.getDate() + 1; // incremented 1 day
    var mmIn = checkinDate.getMonth() + 1;
    var yyyyIn = checkinDate.getFullYear();

    var ddInString = ddIn.toString(); // converted number to string datatype
    var mmInString = mmIn.toString(); // converted number to string datatype

    if (ddIn < 10) { // formatting
        ddInString = '0' + ddIn;
    }
    if (mmIn < 10) { // formatting
        mmInString = '0' + mmIn;
    }

    var dateIn = mmInString + '/' + ddInString + '/' + yyyyIn;
    console.log(dateIn);
    let dateInEle = await $('#full-screen-hero-check-in-input') // checkin intput field
    await dateInEle.setValue(dateIn)

    var checkoutDate = new Date(); // create Date obj for checkout
    checkoutDate.setDate(checkinDate.getDate() + 2);
    var ddOut = checkoutDate.getDate();
    var mmOut = checkoutDate.getMonth() + 1;
    var yyyyOut = checkoutDate.getFullYear();

    var ddOutString = ddOut.toString(); // converted number to string datatype
    var mmOutString = mmOut.toString(); // converted number to string datatype

    if (ddOut < 10) {// formatting
        ddOutString = '0' + ddOut;
    }
    if (mmOut < 10) {// formatting
        mmOutString = '0' + mmOut;
    }

    var dateOut = mmOutString + '/' + ddOutString + '/' + yyyyOut;

    let dateOutEle = await $('#full-screen-hero-check-out-input') // checkout intput field
    await dateOutEle.setValue(dateOut)
    await browser.pause(2000)

})

Then(/^Display searching results$/, async function () {
    let ele = await $('//button[@type="submit"]') // submit element
    await ele.click()
    await browser.pause(2000)

    let eleTitleLink = await $("//div[@class='property-card__header']//a") //title link element
    await eleTitleLink.scrollIntoView()
    await eleTitleLink.click()

    let eleTitkeBut = await $("//div[@class='room-type-card__header']//button")//title button element
    let eleH2 = await $("<h2>") //for scrolling

    await eleH2.scrollIntoView()

    await eleTitkeBut.click()
    await browser.pause(2000)

})

Then(/^Heating in the amenities$/, async function () {

    let ele = await $("//li[text()=' Heating ']")//li element
    await ele.scrollIntoView()
    await browser.pause(2000)
})

Then(/^Not allowed book property for single-night$/, async function () {

    let ele = await $("//div[@class='availability-button-row']").isExisting()// element that holds "Book" button and price info
    
    chai.expect(ele).to.eql(false)//if ele does not exist (false), this test will pass
    await browser.pause(2000)
})
