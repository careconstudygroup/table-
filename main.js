document.addEventListener('DOMContentLoaded', function() {
    /*-------------------------------------------------------
     *
     *
     * ユーザー承認機能(チェック付きユーザーのみ)
     *
     *
     *-------------------------------------------------------*/

    //要素の定義
    const checkboxs = document.querySelectorAll('.user_auth');
    const auth_btn = document.querySelector('.auth-btn');
    const bulk_auth_btn = document.querySelector('.bulk-Auth-button');

    //承認呼び出し
    for (let i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener('change', () => {
            checkauth();
        });
    }

    //一括承認呼び出し
    bulk_auth_btn.addEventListener('click', () => {
        if (bulk_auth_btn.innerText === '一括選択') {
            bulk_auth_btn.innerText = '一括解除';
            bulk_auth();
        } else if (bulk_auth_btn.innerText === '一括解除') {
            bulk_auth_btn.innerText = '一括選択';
            bulk_cancel();
        }
    });

    //承認機能
    function checkauth() {
        const check_count = [];
        [...checkboxs].forEach(e => {
            if (e.checked === true) {
                check_count.push(e);
            }
        });
        if (check_count.length === 0) {
            auth_btn.setAttribute('disabled', 'disabled');
        } else {
            auth_btn.removeAttribute('disabled');
        }
    }

    //一括承認
    function bulk_auth() {
        [...checkboxs].forEach(e => {
            e.checked = true;
        });
        checkauth();
    }

    //一括キャンセル
    function bulk_cancel() {
        [...checkboxs].forEach(e => {
            e.checked = false;
        });
        checkauth();
    }


    /*-------------------------------------------------------
     *
     *
     * テーブル簡易表示機能
     *
     *
     *-------------------------------------------------------*/
    const btn_simple = document.querySelector('.btn-simple');
    const table = document.getElementsByTagName('table')[0];
    const table_tr = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    //簡易表示機能の呼び出し
    btn_simple.addEventListener('click', () => {
        btn_simple.classList.toggle('clicked');
        shimple();
    });

    function shimple() {
        if (btn_simple.classList.contains('clicked')) {
            btn_simple.innerText = '全部表示';
            for (let i = 0; i < table_tr.length; i++) {
                const table_td = table_tr[i].getElementsByTagName('td');
                for (let j = 0; j < table_td.length; j++) {
                    if (table_td[j].getAttribute('data-label') === '氏名') {
                        table_td[j].style.display = 'block';
                    } else {
                        table_td[j].style.display = 'none';
                    }
                }
            }
        } else {
            btn_simple.innerText = '簡易表示';
            for (let i = 0; i < table_tr.length; i++) {
                const table_td = table_tr[i].getElementsByTagName('td');
                for (let j = 0; j < table_td.length; j++) {
                    table_td[j].style.display = 'block';
                }
            }
        }
    }

    /*-------------------------------------------------------
     *
     *
     * 表示崩れ修正
     *
     *
     *-------------------------------------------------------*/
    const mql = window.matchMedia('(min-width: 992px)');
    const user_records = document.querySelectorAll('tbody tr');

    function checkBreakPoint(mql) {
        if (mql.matches) {
            for (let i = 0; i < user_records.length; i++) {
                let record_td = user_records[i].getElementsByTagName('td');
                for (let j = 0; j < record_td.length; j++) {
                    record_td[j].style.display = 'table-cell';
                }
            }
        } else {
            for (let i = 0; i < user_records.length; i++) {
                let record_td = user_records[i].getElementsByTagName('td');
                for (let j = 0; j < record_td.length; j++) {
                    record_td[j].style.display = 'block';
                }
            }
        }
    }

    // ブレイクポイントの瞬間に発火
    mql.addListener(checkBreakPoint);

    // 初回チェック
    checkBreakPoint(mql);

    /*-------------------------------------------------------
     *
     *
     * ユーザー検索
     *
     *
     *-------------------------------------------------------*/
    //検索機能の呼び出し
    const searchbox = document.querySelector('.searchbox');
    searchbox.addEventListener('keyup', () => {
        const search_key = event.target.value;
        let result = finduser(search_key);
        rebuild_table(result);
    });

    //検索結果を元にtableを再構築
    function rebuild_table(result) {
        const user_trs = user_table.getElementsByTagName('tr');
        for (let i = 1; i < user_trs.length; i++) {
            let td = user_trs[i].getElementsByTagName('td')[1].innerText;
            for (let j = 0; j < result.length; j++) {
                if (result.includes(td)) {
                    user_trs[i].style.display = 'table-row';
                } else {
                    user_trs[i].style.display = 'none';
                }
            }
        }
    }

    //名前だけの配列を生成
    const user_table = document.querySelector('.user_table');
    const user_tds = user_table.getElementsByTagName('td');
    const user_name_array = [];
    for (let i = 0; i < user_tds.length; i++) {
        if (user_tds[i].getAttribute('data-label') == '氏名') {
            user_name_array.push(user_tds[i].innerText);
        }
    }

    //検索機能
    function finduser(search_key) {
        let targetData = [];
        let regexp = new RegExp(search_key + '(.*?)', 'g');
        for (let i = 0; i < user_name_array.length; i++) {
            if (user_name_array[i].match(regexp)) {
                targetData.push(user_name_array[i]);
            }
        }
        return targetData;
    }


});
