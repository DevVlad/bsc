describe('app testing', function() {

    it('create note', function() {

        browser.waitForAngularEnabled(false);
        browser.get('/');
        browser.driver.sleep(1500);

        $('#add-button').click();
        $('input[name="title"]').sendKeys('test');
        $('#create-note').click();
        browser.driver.sleep(1500);

        expect($$("tr").count()).toBe(4);
    });

    it('edit note', function() {

        browser.waitForAngularEnabled(false);
        browser.get('/');
        browser.driver.sleep(1500);

        $('#edit-note-1').click();
        $('input[name="title"]').sendKeys('test');
        $('#create-note').click();
        browser.driver.sleep(1500);

        $('#note-1').getText().then(function (text) {
            expect(text).toBe('Jogging in parktest');
        });
    });

    it('delete note', function() {

        browser.waitForAngularEnabled(false);
        browser.get('/');
        browser.driver.sleep(1500);

        $('#delete-note-1').click();
        browser.driver.sleep(1500);
        
        expect($$("tr").count()).toBe(2);
    });

});