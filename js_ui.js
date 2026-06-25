(function() {
    if (document.getElementById('cg-pop')) return;

    var h = 'https://www.pornhub.com';
    var models = 'CreamySpot*creamy-spot/videos?o=mr|YourShyCrush*yourshycrush|LiiMewls*liimewls/videos|ThePerfectStorm14*theperfectstorm14|WowMarie*wowmarie/videos|MeeHutao*meehutao/videos?o=mr|Rosie_Alena*rosie-and-alena/videos?o=mr|20Lesbian25*20lesbian25|Jane_Laneee*jane-laneee/videos?o=mr|Lane217*lane217/videos?o=mr|AshMochi69*ashmochi69/videos?o=mr|Eve*eve/videos?o=mr|Leah_Meow*leah-meow?o=mr|SpiritJOI*spiritjoi?o=mr';
    
    var html = '<div id="cg-pop" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:2147483647;display:flex;align-items:center;justify-content:center;" onclick="this.remove()">' +
               '<div style="background:#fff;padding:12px;border-radius:12px;width:230px;max-height:60vh;display:flex;flex-direction:column;" onclick="event.stopPropagation()">' +
               '<div style="flex:1;overflow-y:auto;margin-bottom:8px;">' +
               '<button style="width:100%;margin:4px 0;padding:6px;text-align:left;font-size:13px;" onclick="location.href=\'https://devil4939.github.io/website/js_ui.html\'">Js_UI</button>' +
               '<button style="width:100%;margin:4px 0;padding:6px;text-align:left;font-size:13px;" onclick="location.href=\''+h+'\'">Pornhub</button>' +
               '<button style="width:100%;margin:4px 0;padding:6px;text-align:left;font-size:13px;" onclick="location.href=\'https://simptown.su\'">SimpTown</button>';

    models.split('|').forEach(function(s) {
        var p = s.split('*');
        html += '<button style="width:100%;margin:4px 0;padding:6px;text-align:left;font-size:13px;" onclick="location.href=\'' + h + '/model/' + p[1] + '\'">' + p[0] + '</button>';
    });

    html += '</div><div style="display:flex;gap:4px;justify-content:center;border-top:1px solid #eee;padding-top:8px;">' +
            '<button style="padding:4px 8px;font-weight:bold;" onclick="location.href=\'https://kemono.cr/account/favorites/artists\'">K</button>' +
            '<button style="padding:4px 8px;font-weight:bold;" onclick="location.href=\''+h+'\'">P</button>' +
            '<button style="padding:4px 8px;font-weight:bold;" onclick="location.href=\'https://coomer.st/account/favorites/artists\'">C</button>' +
            '<button style="padding:4px 8px;font-weight:bold;" onclick="location.href=\'https://rule34.xxx/index.php?page=post&s=list&tags=+%28+yuri+%7e+futa_on_female+%7e+solo_female+%7e+lesbian+%29+animated+-male+sound&pid=0\'">R</button>' +
            '</div></div></div>';

    document.body.insertAdjacentHTML('beforeend', html);
})();
