Vue.component('cvex-events',{
    props:["JsonData"],
    data:function(){
        return {
            showpopup:'false',
            popupfoundation:'false',
            currentImgpath:"",
            linkUrl:"",
            usercName:null,
            companycName:null,
            emailv: '',
            isVisible: false,
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/       
        }
    },
    template:`<div>
    <div class="cvex-inner-conatiner webinare-info">
        <div class="clearfix row-gutter">
            <div class="left-panel">
                <div class="webinare-panel-tab">
                    <div class="cvex-title-panel" v-html="JsonData.cvexEvent.heading"></div>
                    <ul class="clearfix">
                        <li class="selected-webinare" v-for="cvexEvnta of JsonData.cvexEvent.eventDetail" :class="[cvexEvnta.outofdate=='true' ? 'event-deactivate' : '']">
                            <div class="webinare-sm-title" v-html="cvexEvnta.WebinarNo"></div>
                            <div class="webinare-tile" v-html="cvexEvnta.headerTitle"></div>
                            <div class="webinare-date" v-html="cvexEvnta.date"></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="webinare-panel-inner">
                <div class="cvex-title-panel">
                    <span class="left-head-text" v-html="JsonData.cvexDetail.heading"></span>
                    <div class="rightNav">
                        <a v-for="rightNav of JsonData.cvexDetail.rightNav" v-bind:href="rightNav.menulink" class="righthomelink" v-html="rightNav.menuText" :target="rightNav.menuTarget"></a>
                    </div>
                </div>
                <div class="webinare-resize">
                    <div class="row-gutter">
                        <div class="webinare-col" v-for="cvexwebinair of JsonData.cvexDetail.eventDetail">
                            <div class="webinare-panel" >
                                <div class="webinare-body">
                                    <div class="webinare-heading logo"><div class="HeadingText-cus" v-html="cvexwebinair.headerTitle"></div><div class="HeadingImg-cus"><img v-if="cvexwebinair.companyLogo" :src="cvexwebinair.companyLogo" alt="logo"></div></div>
                                    <div class="wb-body-panel" v-html="cvexwebinair.evntDetail">
                                    </div>
                                </div>
                                <div class="webinare-footer">
                                    <div class="webinare-date-info clearfix">
                                        <div class="wb-date detail-info">
                                            <span class="calender-details calender-icons"></span>
                                            <span class="date-info wb-deatil" v-html="cvexwebinair.date"></span>
                                        </div>
                                        <div class="detail-info">
                                            <span class="calender-details timer-icons"></span>
                                            <span class="date-info wb-deatil" v-html="cvexwebinair.time"></span>
                                        </div>
                                    </div>
                                    <div class="notify-footer notify-user">
                                        <div class="pull-left v-align">
                                            <div class="media-lt">
                                                <div class="user-pic"><img v-if="cvexwebinair.userPic" :src="cvexwebinair.userPic" alt=""></div>
                                            </div>
                                            <div class="media-rt">
                                                <div class="u-name" v-html="cvexwebinair.name"></div>
                                            </div>
                                        </div>                                       
                                        <div class="notify-inner">
                                            <div v-if="cvexwebinair.btnValue=='debrief'"><a :href="cvexwebinair.debriefUrl" target="_blank" class="cst-btn" v-html="cvexwebinair.btnText"></a></div>
                                            <div v-if="cvexwebinair.btnValue=='register'"><a :href="cvexwebinair.debriefUrl" target="_blank" class="cst-btn register" v-html="cvexwebinair.btnText"></a></div>
                                            <div class="cst-btn signup" v-html="cvexwebinair.btnText"  v-if="cvexwebinair.btnValue=='signup'" @click="openpop(cvexwebinair.linkUrl)"></div>
                                            <div class="cst-btn" v-if="cvexwebinair.btnValue=='disable'" v-html="cvexwebinair.btnText"></div>
                                        </div>                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- column end -->
                    </div>
                </div>
            </div>
        </div>
        
        <div class="wht-cvex cstHeight mt-15 dipNond">
            <div class="cvex-title-panel" v-html="JsonData.whatCVEx.heading"></div>
            <div class="wht-cvex-inner" v-for="whatcvex of JsonData.whatCVEx.KnowDetail">
                <div class="wht-cvx-text" v-html="whatcvex.titleDetail">Value creation</div>
                <div class="text-box" v-html="whatcvex.textDetail"></div>
            </div>
        </div>
        <div class="wht-cvex flRight lightgray mt-15 dipNond">
            <div class="cvex-title-panel" v-html="JsonData.cvexMatters.heading"></div>
            <div class="wht-cvex-inner" v-for="cvexMatres of JsonData.cvexMatters.matressDetail">
                <div class="wht-cvx-text" v-html="cvexMatres.detailTitle"></div>
                <div class="text-box" v-html="cvexMatres.textDetail"></div>
            </div>
        </div>
        <div class="clearfix cutomer-evalut-inner dipNond">
            <div class="gutter-50">
                <div class="cutomer-evalut-know">
                    <div class="col-50" v-for="cvexpost of JsonData.cvexPost.postDetail">
                        <div class="cutomer-evalution">
                            <div class="webinare-body cutomer-evalution-body">
                                <div class="webinare-heading" v-html="cvexpost.detailTitle"></div>
                                <div class="wb-body-panel" v-html="cvexpost.detailText"></div>
                            </div>
                            <div class="read-more" :style="cvexpost.readmoreText==''?'visibility:hidden':''" >
                                <div class="cst-btn" v-html="cvexpost.readmoreText"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix foundationinner dipNond">
            <div class="cvex-title-panel mt-15" v-html="JsonData.cvexFoundations.heading"></div>
            <div class="gutter-50">
                <div class="col-50" v-for="cvexfoundation of JsonData.cvexFoundations.foundationsDetail">
                    <div class="thumb-img cus-img">
                        <img id="1" :src="cvexfoundation.userPic" @click="foundationpopup(cvexfoundation.userPic)">
                    </div>
                </div>
                <div id="img-popup" class="img-popup" v-show="popupfoundation != 'false'">
                    <div class="image-body">
                        <div class="img-header">
                            <span id="img-close" class="close" @click="foundationpophide()"></span>
                        </div>
                        <div class="cvex-poup-content cus-overflow">
                            <img id="1" :src="currentImgpath">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="expert-container">
            <div class="expert-inner">
                <div class="expert-title">
                    <span v-html="JsonData.cvexExperts.heading"></span>
                    <div class="right-coatct-block">
                        <!--<div class="tooltipsHover" @click="mClickHandler">-->
                        <div class="tooltipsHover">
                            <span>
                                <a v-bind:href="'mailto:'+JsonData.cvexExperts.mailto" v-html="JsonData.cvexExperts.subhead"></a>
                            </span>
                            <span class="hoverText" id="toggleTooltips" v-html="JsonData.cvexExperts.beforeEmailText"></span>
                        </div>
                        <div class="email-block">
                            <a v-bind:href=" 'mailto:' + JsonData.cvexExperts.mailto" v-html="JsonData.cvexExperts.custemailId"></a>
                        </div>
                    </div>
                </div>
                <div class="expert-resize clearfix">
                    <div class="expert inline-blk">
                        <div class="expert-col" v-for="cvexExpert of JsonData.cvexExperts.KnowDetail">
                            <div class="media-object">
                                <div class="media-icon">
                                    <img :src="cvexExpert.userPic" alt="cvexExpert.userName">
                                </div>
                                <div class="media-body">
                                    <div class="eperts-name" v-html="cvexExpert.userName"></div>
                                    <div class="eperts-dpt" v-html="cvexExpert.userProfile"></div>
                                    <div class="eperts-contact"><a href="mailto:cvexExpert.emailId" v-html="cvexExpert.emailId"></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="mycvex-poup" class="cvex-poup" v-show="showpopup != 'false'">
    <div class="cvex-popup-body ">
        <div class="cvex-poup-header">
            <span id="form-close" class="close" @click="hidepopup()"></span>
            <div class="popup-header-title" v-html="JsonData.registration.regitrationtxt">Registration</div>
        </div>
        <div class="cvex-poup-content">
            <div class="form-row">
                <div :class="['form-group',isNameValid()]">
                    <label for="name" v-html="JsonData.registration.nameTxt">Name *</label>
                    <input type="text" name="name" id="cvxname" class="cst-form-control" v-model="usercName" @input="inputText('_Name',$event)">
                </div>
            </div>
            <div class="form-row">
                <div :class="['form-group',isEmailValid()]">
                    <label for="email" v-html="JsonData.registration.emailidtxt">Email ID *</label>
                    <input type="text" name="email" id="cvxemail" class="cst-form-control" v-model="emailv" @input="inputText('_Email',$event)">
                    <span>Invalid Email ID</span>
                </div>
            </div>
            <div class="form-row">
                <div :class="['form-group',isNcompanyValid()]">
                    <label for="company" v-html="JsonData.registration.companytxt">Company *</label>
                    <input type="text" name="company" id="cvxcompany" class="cst-form-control" v-model="companycName" @input="inputText('_Company',$event)">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="position" v-html="JsonData.registration.positontxt">Position</label>
                    <input type="text" name="position" id="cvxposition" class="cst-form-control" @input="inputText('_Position',$event)">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="PhoneNo" v-html="JsonData.registration.phonenotxt">Phone No.</label>
                    <input type="text" name="PhoneNo" id="cvxphoneno" class="cst-form-control" @input="inputText('_PhoneNo',$event, 'num')">
                </div>
            </div>
            <div class="form-btn">
                <div class="cvex-btn" @click="registernow()" v-html="JsonData.registration.registertxt">Register</div>
            </div>
        </div>
    </div>
</div>
<!--<div style="display:none;" class="nav_up" id="nav_up"></div>
<div style="display:none;" class="nav_down" id="nav_down"></div>-->
</div>`,

    mounted:function(){
        this.setHeight("wb-body-panel");
        this.setHeight("cutomer-evalution-body");
        //this.setHeight("thumb-img");
        window.addEventListener("resize",()=>{
            this.setHeight("wb-body-panel");
            this.setHeight("cutomer-evalution-body");
            //this.setHeight("thumb-img");
        });
        document.getElementsByTagName("head")[0].innerHTML += '<link rel="shortcut icon" href="/isa/DVNOLDERHBIKJTBACYEDAXAAGTKDNVBY/cvexwebsitenew/favicon.ico" type="image/x-icon"> \
        <link rel="apple-touch-icon" href="/isa/DVNOLDERHBIKJTBACYEDAXAAGTKDNVBY/cvexwebsitenew/apple-icon-57x57.png"> \
        <link rel="apple-touch-icon" sizes="180x180" href="/isa/DVNOLDERHBIKJTBACYEDAXAAGTKDNVBY/cvexwebsitenew/apple-icon-114x114.png"> \
        <link rel="apple-touch-icon" sizes="152x152" href="/isa/DVNOLDERHBIKJTBACYEDAXAAGTKDNVBY/cvexwebsitenew/apple-icon-72x72.png"> \
        <link rel="apple-touch-icon" sizes="167x167" href="/isa/DVNOLDERHBIKJTBACYEDAXAAGTKDNVBY/cvexwebsitenew/apple-icon-144x144.png">';
        // document.addEventListener("DOMContentLoaded", ()=> {
        //     var instance = OverlayScrollbars(document.querySelector('.cus-overflow'), { });
        // });
        document.addEventListener("click", () => {
            document
              .querySelectorAll(".tooltip-show")
              .forEach((elem) => elem.classList.remove("tooltip-show"));
          });

        this.$nextTick(function() {
            //this.initToTopButton();
        });


        /*$(function() {
            var $elem = $('#main-wrapper');
            
            $('#nav_up').fadeIn('slow');
            $('#nav_down').fadeIn('slow');  
            
            $(window).bind('scrollstart', function(){
                $('#nav_up,#nav_down').stop().animate({'opacity':'0.2'});
            });
            $(window).bind('scrollstop', function(){
                $('#nav_up,#nav_down').stop().animate({'opacity':'1'});
            });
            
            $('#nav_down').click(
                function (e) {
                    $('html, body').animate({scrollTop: $elem.height()}, 800);
                }
            );
            $('#nav_up').click(
                function (e) {
                    $('html, body').animate({scrollTop: '0px'}, 800);
                }
            );
        });*/
        
    },
    methods:{

        handleSelect:function(index,e){
            this.JsonData.inputFields[index].selectedId = e.target.value;
            document.querySelector("#"+e.target.value).click();
        },
        handleInput:function(id,index, e){
            if(!/^[1-9]+[0-9]*$/.test(e.target.value)){
                var valArr = e.target.value.split('');
                valArr.pop();
                e.target.value = valArr.join('');
            }
            document.getElementById(id).value = e.target.value;
            this.JsonData.inputFields[index].inputVal = e.target.value;
        },
        openpop:function(linkUrl){
            this.linkUrl = linkUrl;
            this.showpopup = 'true';
        },
        foundationpopup:function(currentImg){
            this.currentImgpath =currentImg;
            this.popupfoundation = 'true';
            var instance = OverlayScrollbars(document.querySelector('.cus-overflow'), { });
        },
        foundationpophide:function(){
            this.popupfoundation = 'false'
        },
        hidepopup:function(){
            this.showpopup = 'false';
            //document.querySelector('#cvxname').value = "";
            //document.querySelector('#cvxemail').value = "";
            this.usercName="",
            this.emailv='',
            this.companycName="",
            document.querySelector('#cvxposition').value = "";
            document.querySelector('#cvxphoneno').value = "";
            document.querySelector('#'+this.linkUrl+'_Name').value = "";
            document.querySelector('#'+this.linkUrl+'_Email').value = "";
            document.querySelector('#'+this.linkUrl+'_Company').value = "";
            document.querySelector('#'+this.linkUrl+'_Position').value = "";
            document.querySelector('#'+this.linkUrl+'_PhoneNo').value = "";
        },
        inputText:function(tag,e,attr){
            let val = e.target.value;
            val = val.replace(/^ +/gm, '');

            if(tag=='_Name'){
                this.usercName = val;
            }
            if(tag=='_Company'){
                this.companycName = val;
            }
            if(tag=='_Email'){
                this.emailv = val;
            }
            if(tag=='_Position'){
                e.target.value = val;
            }
            if(attr=='num'){
                val = val.replace(/\D/g,'');
                if(val.length>12){
                    var valArray = val.split("");
                    valArray.splice(12);
                    val = valArray.join("");
                }
                document.getElementById("cvxphoneno").value = val;
            }
            document.getElementById(this.linkUrl+tag).value = val;
        },
        isNameValid: function() {
            return (this.usercName == null)? "" : (this.usercName=="") ? 'has-error' : 'has-success';
        },
        isNcompanyValid: function() {
            
            return (this.companycName == null)? "" : (this.companycName=="") ? 'has-error' : 'has-success';
        },
        isEmailValid: function() {
            return (this.emailv == "")? "" : (this.reg.test(this.emailv)) ? 'has-success' : 'has-error';
        },
        registernow:function(){
            var userName = document.getElementById("cvxname").value;
            var useremail = document.getElementById("cvxemail").value;
            var usercompany = document.getElementById("cvxcompany").value;
            if ((userName == null || userName == "")) {
                document.getElementById('cvxname').parentNode.classList.add('has-error');
                return false;
            }
            if ((useremail == null || useremail == "")) {
                document.getElementById('cvxemail').parentNode.classList.add('has-error');
                return false;
            }
            if (this.reg.test(useremail) == false) {
                return false;
            }
            if ((usercompany == null || usercompany == "")) {                
                document.getElementById('cvxcompany').parentNode.classList.add('has-error');
                return false;
            }
            
            //this.hidepopup();
            document.getElementById('forwardbutton').click();
        },
        setHeight:function(getClassName){

            if (!Object.entries) {
    
                Object.entries = function( obj ){
                  var ownProps = Object.keys( obj ),
                      i = ownProps.length,
                      resArray = new Array(i); // preallocate the Array
                  while (i--)
                    resArray[i] = [ownProps[i], obj[ownProps[i]]];
                  
                  return resArray;
                };
            }
    
            var surRows = document.getElementsByClassName(getClassName);
            var headHght = 0;

            for(var i = 0; i < surRows.length; i++){ //var i = 0; i < surRows.length; i++ //let surRow of surRows
                surRows[i].setAttribute("style","height:auto");
                let sCradHeaderHght = surRows[i].offsetHeight;
                if(headHght<sCradHeaderHght){
                    headHght = sCradHeaderHght;
                }
            }

            for(var i = 0; i < surRows.length; i++){ //var i = 0; i < surRows.length; i++ //let surRow of surRows
                surRows[i].setAttribute("style","height:"+(headHght+10)+"px");
            }

        },
        /*mClickHandler:function(e){
            let isClass = false;
            if (e.target.parentNode.classList.contains("tooltip-show")) {
                isClass = true;
            }
        
            document
                .querySelectorAll(".tooltip-show")
                .forEach((elem) => elem.classList.remove("tooltip-show"));
            const list = e.target.parentNode.classList;
            if (isClass) {
                e.target.parentNode.classList.remove("tooltip-show");
            } else {
                setTimeout(() => {
                e.target.parentNode.classList.add("tooltip-show");
                }, 0);
            }
        }*/
    }
    
})