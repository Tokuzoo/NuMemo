const $main = document.getElementById('main');
const $main_table = document.getElementById('main_table');
const $start = document.getElementById('start');
const $disp_page = document.getElementById('disp_page');
const $time = document.getElementById('time');
const $list = document.querySelectorAll("#main_table td");
const $cnt = document.getElementById('cnt');
const $stat = document.getElementById('stat');

let cnt = 7-1;
let trial_cnt = 10;

$disp_page.classList.add('hidden');

const get_random = function(min, max){
    let random = Math.floor(Math.random() * (max + 1 - min)) + min;
  
    return random;
}

function init_table(){

    for(const td of $list){
        td.classList.add('center');

        td.onclick = event => onclickTd(td, event);
    }

    $cnt.textContent = 'スコア: ' + 0;
}

let cur_num;

function onclickTd(td, event){
    const idx = Array.prototype.indexOf.call($list, td);
    if(nums[idx] === cur_num){
        td.classList.add('invalid');
        td.textContent = nums[idx];
        cur_num++;
    } else if(nums[idx] !== 0){
        fail_handler();
    }

    if(cur_num === cnt+1){
        console.log('cleared');
        succ_handler();
    }
}

let succ_cnt = 0;
function succ_handler(){
    $stat.textContent = '成功';
    succ_cnt++;
    $cnt.textContent = 'スコア: ' + succ_cnt;
    reset();
}

function fail_handler(){
    let idx = 0;
    for(const td of $list){
        if(td.textContent == "●") td.textContent = nums[idx];
        idx++;
    }

    $stat.textContent = '失敗';
    reset();
}

let model = [];
let nums = [];
function reset(){
    trial_cnt--;
    if(trial_cnt % 2 !== 0) cnt++;

    if(trial_cnt === -1){
        setTimeout(function(){
            $stat.textContent = '終了です。おつかれさま';
        }, 1500);

        return;
    }

    model = [];
    for(let i=0; i<18; i++) model.push(i);
    nums = [];
    for(let i=0; i<18; i++) nums.push(0);

    cur_num = 1;

    for(const td of $list){
        td.classList.add('invalid');
    }

    setTimeout(count3, 1500);
    setTimeout(count2, 2500);
    setTimeout(count1, 3500);

    setTimeout(set, 4500);
}

function count3(){
    $stat.textContent = '3';
}

function count2(){
    $stat.textContent = '2';
}

function count1(){
    $stat.textContent = '1';
}

function set(){
    $stat.textContent = "";

    for(const td of $list){
        td.textContent = "";
    }

    for(let i=1; i<=cnt; i++){
        const idx = get_random(0, model.length-1);
        nums[model[idx]] = i;
        model.splice(idx, 1);
    }

    let idx = 0;
    for(const td of $list){
        if(nums[idx] !== 0) td.textContent = nums[idx];
        idx++;
    }

    window.setTimeout(hide_nums, cnt*700);
}

function hide_nums(){
    for(const td of $list){
        if(td.textContent != "") td.textContent = "●";
        td.classList.remove('invalid');
    }
}

$start.addEventListener('click',() => {
    $main.classList.toggle('hidden');
    $disp_page.classList.toggle('hidden');

    init_table();
    reset();
})
