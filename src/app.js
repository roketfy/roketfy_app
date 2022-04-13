const {app,Composite,Button, TextView,Font,statusBar,Switch,RefreshComposite,Setter,WebView,ScrollView,navigationBar,ImageView,contentView,Stack,Canvas,TextInput,CheckBox,AlertDialog,Tab,TabFolder,Action, NavigationView,ActivityIndicator,Page} = require('tabris');
var tabris_1 = require("tabris");
const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

login = localStorage.getItem('login');

var notifications_count = 0;

navigationBar.background = '#4D67DF';
navigationBar.displayMode = 'float';
statusBar.background = '#F3F4F9';

var email = '';
var pass = '';

const activityIndicator = new ActivityIndicator({layoutData:'center'});

const tabFolder = new TabFolder({
  left: 0, top: 0, right: 0, bottom: 0,
  tabBarLocation: 'bottom',
  background: '#F3F4F9',
  paging: true,
  selectedTabTintColor: '#FF6000',
}).appendTo(tabris_1.contentView);

function createTab(title, image) {
    notifications = 0;
    email = localStorage.getItem('email');
    pass = localStorage.getItem('pass');
    var data = JSON.stringify({
        "email": email,
        "password": pass
    });
    const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
          notifications_count = JSON.parse(xhr.responseText)['item_count'];
          localStorage.setItem('notifications_count', notifications_count);
        }
      };
    xhr.open("POST", "https://api.roketfy.com/rapi/dashboard/notifications.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  
    if(title == 'Bildirimler'){
      notifications = localStorage.getItem('notifications_count');
    }else{
      notifications = 0;
    }
    const tab = new Tab({title, image, badge:notifications})
      .appendTo(tabFolder);
    const navigationViewTab = new NavigationView({
      left: 0, top: 0, right: 0, bottom: 0,toolbarVisible:false,
    }).appendTo(tab);
    createPage(navigationViewTab, title);
  
}

function createPage(navigationViewTab, title) {
  const text = title || 'Page ' + (navigationViewTab.pages().length + 1);
  if(title == 'Gösterge Paneli'){
    email = localStorage.getItem('email');
    pass = localStorage.getItem('pass');
    var data = JSON.stringify({
        "email": email,
        "password": pass
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            var seller_score = JSON.parse(xhr.responseText)['seller_score'];
            var products_onSale = JSON.parse(xhr.responseText)['products_onSale'];
            var products_notOnSale = JSON.parse(xhr.responseText)['products_notOnSale'];
            var products_outOfStock = JSON.parse(xhr.responseText)['products_outOfStock'];
            var products_lowScore = JSON.parse(xhr.responseText)['products_lowScore'];
            var products_hasBuybox = JSON.parse(xhr.responseText)['products_hasBuybox'];
            company_name = JSON.parse(xhr.responseText)['company_name'];
            var orders_todayCount = JSON.parse(xhr.responseText)['orders_todayCount'];
            var orders_today = JSON.parse(xhr.responseText)['orders_today'];
            var orders_lastWeekCount = JSON.parse(xhr.responseText)['orders_lastWeekCount'];
            var orders_lastWeek = JSON.parse(xhr.responseText)['orders_lastWeek'];
            var orders_returned = JSON.parse(xhr.responseText)['orders_returned'];
            var orders_cancelled = JSON.parse(xhr.responseText)['orders_cancelled'];
            var orders_delivered = JSON.parse(xhr.responseText)['orders_delivered'];

            const page = new Page({
              title: company_name,
              background: '#F3F4F9',
            }).appendTo(navigationViewTab);
            const controls = new Composite({
              centerX: 0, centerY: 0
            }).appendTo(page);
            const scrollView_dash = new ScrollView({layoutData: 'stretch'}).appendTo(navigationViewTab.pages(0));

            if(seller_score>9){
              seller_score_color = '#44D454';
            }else if(seller_score>7 && seller_score<9){
              seller_score_color = '#FEAA00';
            }else{
              seller_score_color = '#FE0000';
            }


            scrollView_dash.append(
              Composite({
                top: 20,
                right: 20,
                left: 20,
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 24px sans-serif">'+company_name+'</span>',
                    left: 0,
                    top:3,
                    textColor:'#0A2540',
                  }),
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+seller_score+'</span>',
                    right: 0,
                    background: seller_score_color,
                    cornerRadius:10,
                    width:36,
                    height:36,
                    alignment: 'centerX',
                    textColor:'#fff',
                  }),
                ]
              })
            );

            
            scrollView_dash.append(
              Composite({
                top: 'prev() 20',
                right: 20,
                left: 20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+products_onSale+'</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: '<span>Satışta</span>',
                    top:3,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 10',
                right: 20,
                left: 20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+products_notOnSale+'</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: '<span>Satışta Olmayan</span>',
                    top:3,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 10',
                right: 20,
                left: 20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+products_outOfStock+'</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: '<span>Tükenen</span>',
                    top:3,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 10',
                right: 20,
                left: 20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+products_lowScore+'</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: '<span>Düşük Puanlı</span>',
                    top:3,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 10',
                right: 20,
                left: 20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+products_hasBuybox+'</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: "<span>Buybox'a Giren</span>",
                    top:2,
                  }),
                ]
              })
            );

            pass = encodeURIComponent(pass);

            scrollView_dash.append(
              Composite({
                top: 'prev() 30',
                right: 20,
                left: 20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  new WebView({
                    left:0,
                    right:0,
                    top:20,
                    height:170,
                    url: 'https://api.roketfy.com/rapi/chart_performanse.php?email='+email+'&pass='+pass,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: "<b>Haftalık Performans</b>",
                    top:2,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 30',
                left: 20,
                right:20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+orders_todayCount+'</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: "<span>Bugünkü Satışım</span>",
                    top:2,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 10',
                left: 20,
                right:20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+orders_today+'₺</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: "<span>Bugünkü Siparişim</span>",
                    top:2,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 20',
                left: 20,
                right:20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+orders_lastWeekCount+'</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: "<span>Son 1 Haftalık Siparişim</span>",
                    top:2,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 10',
                left: 20,
                right:20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+orders_lastWeek+'₺</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: "<span>Son 1 Haftalık Satışım</span>",
                    top:2,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 20',
                left: 20,
                right:20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+orders_returned+'₺</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: "<span>İade Edilenler</span>",
                    top:2,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 10',
                left: 20,
                right:20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+orders_cancelled+'₺</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: "<span>İptal Edilenler</span>",
                    top:2,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 10',
                left: 20,
                right:20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  TextView({
                    markupEnabled: true,
                    text: '<span font="normal bold 18px sans-serif">'+orders_delivered+'₺</span>',
                    right: 0,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: "<span>Teslim Edilenler</span>",
                    top:2,
                  }),
                ]
              })
            );

            scrollView_dash.append(
              Composite({
                top: 'prev() 30',
                right: 20,
                left: 20,
                cornerRadius:4,
                background: '#fff',
                padding: {left: 20, right: 20, top: 10, bottom: 10},
                children: [
                  new WebView({
                    left:0,
                    right:0,
                    top:20,
                    height:170,
                    url: 'https://api.roketfy.com/rapi/chart_map.php?email='+email+'&pass='+pass,
                  }),
                  TextView({
                    markupEnabled: true,
                    text: "<b>Şehirlere göre Siparişler</b>",
                    top:2,
                  }),
                ]
              })
            );

            new TextView({
                  top: 'prev() 10',
                  text: ''
            }).appendTo(scrollView_dash);
            
        }
    };
    xhr.open("POST", "https://api.roketfy.com/rapi/dashboard/dash-data.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);

  }if(title == 'Fiyat Asistanı'){
    const page = new Page({
      title: text,
      background: '#F3F4F9'
    }).appendTo(navigationViewTab);
    const controls = new Composite({
      centerX: 0, centerY: 0
    }).appendTo(page);
    const scrollView_price = new ScrollView({layoutData: 'stretch'}).appendTo(navigationViewTab.pages(0));
    scrollView_price.append(
      Composite({
        top: 20,
        right: 0,
        left: 20,
        children: [
          TextView({
            markupEnabled: true,
            text: '<span font="normal bold 24px sans-serif">Fiyat Asistanı</span>',
            left: 0,
            top:0,
            textColor:'#0A2540',
          }),
        ]
      })
    );
    var data = JSON.stringify({
        "email": email,
        "password": pass
    });
    const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
          pricing_count = JSON.parse(xhr.responseText)['item_count'];
          if(pricing_count>0){
            pricing_arr = JSON.parse(xhr.responseText)['pricing_items'];
            for(var i=0;i<pricing_arr.length;i++){
              function pad2(n) {
                return (n < 10 ? '0' : '') + n;
              }
              var product_name=pricing_arr[i]['product_name'];
              var min_price=pricing_arr[i]['min_price'];
              var max_price=pricing_arr[i]['max_price'];
              var step_price=pricing_arr[i]['step_price'];
              var platform_price=pricing_arr[i]['platform'];
              var rule_type=pricing_arr[i]['rule_type'];
              var active=pricing_arr[i]['active'];
              var pricing_rule_id=pricing_arr[i]['rule_id'];
              var pricing_logo;
              if(platform_price == 'trnd'){
                pricing_logo = 'src/img/ty-logo.png';
              }else if(platform_price == 'hb'){
                pricing_logo = 'src/img/hb-logo.png';
              }
              if(rule_type == 'buybox'){
                var rule_type_text = "Buybox'a göre";
              }else if(rule_type == 'competitor'){
                var rule_type_text = "Rakibe göre";
              }
              if(active=='1'){
                var switch_check=true;
              }else{
                var switch_check=false;
              }
              if(active=='1'){
                var switch_change='0';
              }else{
                var switch_change='1';
              }
              function price_api(active){
                if(active==true){
                  var actv='1';
                }else{
                  var actv='0';
                }
                pass = pass.replace("%23", "#");
                var pricing_data = JSON.stringify({
                  "email": email,
                  "password": pass,
                  "id": pricing_rule_id,
                  "active": actv,
                });

                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.addEventListener("readystatechange", function() {
                  if(this.readyState === 4) {
                    console.log(this.responseText);
                  }
                });

                xhr.open("POST", "https://api.roketfy.com/rapi/dashboard/pricing_assistant_update.php");
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(pricing_data);
              }
              scrollView_price.append(
                Composite({
                  right: 20,
                  left: 20,
                  top: 'prev() 20',
                  background:'#ffffff',
                  padding:10,
                  cornerRadius:8,
                  children: [
                    TextView({
                      markupEnabled: true,
                      text: '<span font="normal medium 13px sans-serif">'+rule_type_text+'</span>',
                      padding:2,
                      cornerRadius:2,
                      background: '#FF6000',
                      textColor:'#ffffff',
                      alignment:'left',
                      lineSpacing:1.4,
                      left:0,
                    }),
                    ImageView({
                      image: {
                        src: pricing_logo,
                        height: 18
                      },
                      left:'prev() 10',
                      scaleMode: 'fit',
                      height: 18,
                    }),
                    TextView({
                      markupEnabled: true,
                      text: product_name,
                      right:40,
                      alignment:'left',
                      lineSpacing:1.3,
                      left:0,
                      top:'prev() 10',
                    }),
                    Composite({
                      top:'prev() 10',
                      left: 0,
                      children: [
                        TextView({
                          markupEnabled: true,
                          text: '<span font="normal medium 12px sans-serif">Minimum Fiyat '+min_price+'₺</span>',
                          alignment:'left',
                          textColor:'#4D67DF',
                        }),
                        TextView({
                          markupEnabled: true,
                          text: '<span font="normal medium 12px sans-serif">Maksimum Fiyat '+max_price+'₺</span>',
                          alignment:'left',
                          textColor:'#4D67DF',
                          left:'prev() 10',
                        }),
                        TextView({
                          markupEnabled: true,
                          text: '<span font="normal medium 12px sans-serif">Değişim Fiyat '+step_price+'₺</span>',
                          alignment:'left',
                          textColor:'#4D67DF',
                          left:0,
                          top:'prev() 10',
                        }),
                      ]
                    }),
                    Switch({
                      right:0,
                      top:20,
                      checked:switch_check,
                    }).onCheckedChanged(event => price_api(event.value)),
                  ]
                })
              );
            }
          }else{
            scrollView_price.append(
              TextView({
                  markupEnabled: true,
                  text: 'Henüz hiçbir ürün için fiyat kuralı oluşturmadınız.',
                  textColor:'#000000',
                  alignment:'left',
                  lineSpacing:1.4,
                  left:20,
                  right:20,
                  top:80,
                })
            );
          }
        }
      };
    xhr.open("POST", "https://api.roketfy.com/rapi/dashboard/pricing_assistant.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);

    
    new Button({
      text: 'Çıkış Yap',
      top:15,
      right:20,
    })
      .onSelect(function () {
        localStorage.clear();
        login = 0;
        localStorage.setItem('login', 0);
        tabris.app.reload();
    }).appendTo(navigationViewTab.pages(0));
    
  }if(title == 'Bildirimler'){
    const page = new Page({
      title: text,
      background: '#F3F4F9'
    }).appendTo(navigationViewTab);
    const controls = new Composite({
      centerX: 0, centerY: 0
    }).appendTo(page);
    const scrollView_noti = new ScrollView({layoutData: 'stretch'}).appendTo(navigationViewTab.pages(0));
    scrollView_noti.append(
      Composite({
        top: 20,
        right: 0,
        left: 20,
        children: [
          TextView({
            markupEnabled: true,
            text: '<span font="normal bold 24px sans-serif">Bildirimler</span>',
            left: 0,
            top:0,
            textColor:'#0A2540',
          }),
          TextView({
            markupEnabled: true,
            text: '<span font="normal bold 18px sans-serif">'+notifications+'</span>',
            left:'prev() 10',
            cornerRadius:10,
            background: '#4D67DF',
            width:48,
            height:32,
            alignment: 'centerX',
            textColor:'#fff',
          }),
        ]
      })
    );

    var data = JSON.stringify({
        "email": email,
        "password": pass
    });

    new Button({
        right: 0, top: 15,
        text: '',
        image: {
          src: 'src/img/refresh.png',
          height: 24
        },
        background:'#F3F4F9',
    }).onSelect(function () {
      tabris.app.reload();
    }).appendTo(scrollView_noti);

    var data_mark_read = JSON.stringify({
      "email": email,
      "password": pass,
    });

    new Button({
        left: 20,right:20, top: 72,
        text: 'TÜMÜNÜ OKUNDU OLARAK İŞARETLE',
        style: 'outline',
        font: 'normal medium 11px sans-serif',
        cornerRadius:8,
        strokeColor: '#4D67DF',
        textColor:'#4D67DF',
    }).onSelect(function () {

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
        }
      });

      xhr.open("POST", "https://api.roketfy.com/rapi/dashboard/notifications_all_read.php");
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.send(data_mark_read);
      tabris.app.reload();
    }).appendTo(scrollView_noti);

    

    const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
          notifications_arr = JSON.parse(xhr.responseText)['notifications'];
          notifications_count = JSON.parse(xhr.responseText)['item_count'];
          if(notifications_count!=0){
            if(notifications_count>50){
              var nal=50;
            }else{
              var nal=notifications_arr.length;
            }
            for(var i=0;i<notifications_count;i++){
              function pad2(n) {
                return (n < 10 ? '0' : '') + n;
              }
              var date_time=notifications_arr[i]['date_time'];
              date_time = date_time.replace(/\s/g, 'T');
              const d = new Date(date_time);
              var day = pad2(d.getDate());
              var month = months[d.getMonth()];
              var hours = pad2(d.getHours());
              var minutes = pad2(d.getMinutes());
              var subject=notifications_arr[i]['subject'];
              var message=notifications_arr[i]['message'];
              var platform=notifications_arr[i]['platform'];
              var status=notifications_arr[i]['status'];
              var notification_logo;
              if(platform == 'trnd'){
                notification_logo = 'src/img/ty-logo.png';
              }else if(platform == 'hb'){
                notification_logo = 'src/img/hb-logo.png';
              }
              scrollView_noti.append(
                Composite({
                  right: 20,
                  left: 20,
                  top: 'prev() 20',
                  background:'#ffffff',
                  padding:10,
                  cornerRadius:8,
                  children: [
                    TextView({
                      markupEnabled: true,
                      text: '<span font="normal bold 13px sans-serif">#'+subject+'</span>',
                      padding:1,
                      cornerRadius:4,
                      background: '#FF6000',
                      textColor:'#ffffff',
                      alignment:'left',
                      lineSpacing:1.4,
                      left:0,
                    }),
                    ImageView({
                      image: {
                        src: notification_logo,
                        height: 18
                      },
                      left:'prev() 10',
                      scaleMode: 'fit',
                      height: 18,
                    }),
                    TextView({
                      markupEnabled: true,
                      text: message,
                      right:0,
                      alignment:'left',
                      lineSpacing:1.3,
                      left:0,
                      top:'prev() 10',
                    }),
                    TextView({
                      markupEnabled: true,
                      text: '<span font="normal normal 11px sans-serif">'+day+' '+month+' | '+hours+':'+minutes+'</span>',
                      alignment:'left',
                      textColor:'#6A6772',
                      top:'prev() 10',
                    }),
                  ]
                })
              );
            }
          }
        }
      };
    xhr.open("POST", "https://api.roketfy.com/rapi/dashboard/notifications.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);


  }
}



if(login == 1 && typeof page == 'undefined'){
    createTab('Gösterge Paneli', 'src/img/dash.png');
    createTab('Bildirimler', 'src/img/noti.png'); 
    createTab('Fiyat Asistanı', 'src/img/price.png'); 
}

if(login == 0 || login == null){
  const login_page = new NavigationView({layoutData: 'stretch',toolbarVisible:false})
    .append(new Page({title: 'Giriş',background:'#F3F4F9'}))
    .appendTo(tabris_1.contentView);

  new ImageView({
    image: {
      src: 'src/img/logo.png',
      width: 64,
      height: 64
    },
    scaleMode: 'fit',
    width: 64,
    centerX: 0,
    top:50,
    height: 64,
  }).appendTo(login_page.pages(0));

  const email_input = new TextInput({
    left: 40, right: 40,top:150,
    height:44,
    padding: {left: 10, right: 10, top: 0, bottom: 0},
    message: 'E-Posta',
    keyboard: 'email',
    focused: true,
  }).onTextChanged(event => {email= event.value}).appendTo(login_page.pages(0));

  const pass_input = new TextInput({
    left: 40, right: 40, top: 'prev() 10',
    height:44,
    padding: {left: 10, right: 10, top: 0, bottom: 0},
    message: 'Parola',
    type: 'password',
  }).onTextChanged(event => {pass= event.value}).appendTo(login_page.pages(0));

  new CheckBox({
    left: 40, right: 40, top: 'prev() 10',
    text: 'Şifreyi Göster'
  }).onCheckedChanged(event => pass_input.revealPassword = event.value)
    .appendTo(login_page.pages(0));

  new tabris_1.Button({
      left: 40,right:40, top: 'prev() 36',
      text: 'Giriş Yap',
      style: 'flat',
      height:48,
      cornerRadius:24,
      background:'#4D67DF',
      textColor:'#ffffff',
  }).onSelect(function () {
    activityIndicator.appendTo(login_page.pages(0));
    if(email && pass != '' || email!='' || pass!=''){
      var data = JSON.stringify({
          "email": email,
          "password": pass
      });
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.onreadystatechange = function () {
          activityIndicator.visible = false;
          if (xhr.readyState === xhr.DONE) {
              new tabris_1.TextView({
                  left: 10, right: 10, top: 'prev() 10',
                  text: JSON.parse(xhr.responseText)['message']
              }).appendTo(login_page.pages(0));
              var login_message = JSON.parse(xhr.responseText)['message'];
              if(login_message=='Successful login.'){
                login = 1;
                localStorage.setItem('login', 1);
                localStorage.setItem('email', email);
                localStorage.setItem('pass', pass);
                login_page.dispose();
                createTab('Gösterge Paneli', 'src/img/dash.png');
                createTab('Bildirimler', 'src/img/noti.png');
                createTab('Fiyat Asistanı', 'src/img/price.png'); 
              }
          }
      };
      xhr.open("POST", "https://api.roketfy.com/rapi/login.php");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
    }else{
      new AlertDialog({
        title: 'Hata',
        buttons: {ok: 'OK'}
      }).open();
      activityIndicator.visible = false;
    }
  }).appendTo(login_page.pages(0));
}
