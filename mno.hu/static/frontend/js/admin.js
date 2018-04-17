/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

adminFuncs = function(){
    var button = document.getElementById('minimal_admin').value;
    if(button == 1){
        
        document.getElementById('minimal_admin').value = 0;
        document.getElementById('closer_icon').className = 'fa fa-arrow-circle-down';
        document.getElementById('admin_box').style.width = '350px';
        document.getElementById('box-sizing').style.width = '295px';
        document.getElementById('admin_box').style.height = '';
        document.getElementById('admin_box').className = 'opened';
        document.getElementById('profiler_bar').className = '';
        setTimeout(function(){
            document.getElementById('admin_body').className = '';
            document.getElementById('box-sizing').style.display = '';
            document.getElementById('admin_body').style.height = '';
        },200);
    }else{
        document.getElementById('minimal_admin').value = 1;
        document.getElementById('closer_icon').className = 'fa fa-gear';
//        document.getElementById('box-sizing').style.display = 'none';
        document.getElementById('admin_body').style.height = '0px';
        document.getElementById('admin_body').className = 'closed';
        setTimeout(function(){
            document.getElementById('admin_box').style.width = '45px';
            document.getElementById('admin_box').style.height = '45px';
            document.getElementById('box-sizing').style.width = '0px';
            document.getElementById('admin_box').className = '';
        },200);
    }
};