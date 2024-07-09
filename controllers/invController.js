const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  // get classification id from the request
  const classification_id = req.params.classificationId
  // use ckassufucatuib id to get inventory based on classification
  const data = await invModel.getInventoryByClassificationId(classification_id)
  // build a view with the vehicles/ inventory results
  const grid = await utilities.buildClassificationGrid(data)
  // get our nav
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory detail
 * ************************** */
invCont.buildInvDetail = async function (req, res, next) {
  // get inventory id from the request
  const inv_id = req.params.invId
  // use inventory id to get inventory based on id
  const data = await invModel.getInvById(inv_id)
  // build a view with the vehicles/ inventory results
  const detail = await utilities.buildInvDetail(data)
  // get our nav
  let nav = await utilities.getNav()
  // create the title of the page
  const title = data.inv_make + " " + data.inv_model
  // render the detail view with the following variables
  res.render("./inventory/detail", {
    title: title,
    nav,
    detail,
  })
}

module.exports = invCont