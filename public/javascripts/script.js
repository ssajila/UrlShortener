var lol = document.getElementById('fullUrl');
        function shrinkfun() {
            $.ajax({
                url: '/shorturl',
                data: {
                    fullUrl: lol.value
                },
                method: 'post',
                success: (response) => {
                    if (response.status) {
                        document.getElementById('fullUrl').style.display = "none"
                        document.getElementById('btnfull').style.display = "none"
                        document.getElementById('shorturl').style.display = "block"
                        document.getElementById('btnshort').style.display = "block"
                        document.getElementById('longhrf').style.display = "block"
                        document.getElementById('orgurl').style.display = "block"
                        document.getElementById('tclicks').style.display = "block"

                        document.getElementById('shorturl').value = response.data.shortUrl
                        document.getElementById('longhrf').href= response.data.longUrl
                        document.getElementById('longhrf').innerHTML = response.data.longUrl
                        document.getElementById('tclicks').innerHTML = "Number Of Clicks :"+response.data.clicks

                      //  document.getElementById('clicks').innerHTML = "Number Of Clicks :"+response.data.clicks


                    }
                    else{

                        document.getElementById('fullUrl').style.display = "block"
                        document.getElementById('btnfull').style.display = "block"
                        document.getElementById('shorturl').style.display = "none"
                        document.getElementById('btnshort').style.display = "none"
                        document.getElementById('fullUrl').style.color = "#df1529"

                        document.getElementById('fullUrl').value = response.message
                    }

                }
                
            })
        }


        function copy() {
            var copyText = document.getElementById("shorturl");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);

            var tooltip = document.getElementById("btnshort");
            tooltip.innerHTML = "Copied!"
        }
