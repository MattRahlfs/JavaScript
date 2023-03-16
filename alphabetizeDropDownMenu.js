function alphabetizeDropDownMenu(elementID) {
        
        $("#" + elementID).html($("#" + elementID + " option").sort(function (a, b) {
            //console.log(a.text == b.text ? 0 : a.text < b.text ? -1 : 1);
            return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
        }))
    }