import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai"

Given(/^Google page is opened$/, async function () {
    browser.url('https://www.google.com')
    //browser.debug()


})

When(/^Search with (.*)$/, async function (searchItem) {
    console.log('>> searchItem: ${searchItem}');
    let ele = await $('[name=q]');
    await ele.setValue(searchItem);
    await browser.keys("Enter")


})

Then(/^Click on the first search result$/, async function () {
    let ele = await $('<h3>')
    ele.click()
}
)

Then(/^URL should match (.*)$/, async function (expectedURL) {
    console.log('>> expectedURL: ${expectedURL}');
    let url = await browser.getUrl()
    chai.expect(url).to.equal(expectedURL)

})

// Web interactions
Given(/^A web page is opened$/, async function () {
    await browser.url('/inputs')
    await browser.setTimeout({ implicit: 15000, pageLoad: 10000 })
    await browser.maximizeWindow()

})

When(/^Perform web interactions$/, async function () {
    /**
     * input box
     * Actions:
     * 1. type into imput box
     * 2. clear the field or add value
     * 3. click and type
     * 4. slow typing
     */
    let number = 12345
    let strNum = number.toString()
    let ele = await $('[type = number]')
    await ele.click() //scrollinoview or moveto alternatives
    // await ele.setValue(strNum)
    for (let i = 0; i < strNum.length; i++) {
        //await ele.setValue(strNum[i]) 
        await browser.pause(1000)
        await browser.keys(strNum[i])
    }

    await browser.debug()
})
