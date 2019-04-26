'use strict';

{
  // 複数の単語を定数で用意
  const words = [
    'apple',
    'orange',
    'banana',
    'cat',
    'star',
    'eagle',
  ]
  // タイプするワードをランダムに指定
  let word = words[Math.floor(Math.random() * words.length)];
  // 何番目を今、打つべきか変数で管理
  let loc = 0;
  // scoreやmissの数を管理する変数を宣言
  let score = 0;
  let miss = 0;
  // 時間制限を設ける
  const timeLimit = 3 * 1000;
  let startTime;

  // html要素を取得
  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  // updateTarget関数を取得
  function updateTarget() {
    let placeholder = ''; //初期化
    for(let i = 0; i < loc; i++){
      placeholder += '_';
    }
    // substring()で部分文字列を取得
    target.textContent = placeholder + word.substring(loc);
  }

  // 残り時間の計算
  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    // カウントダウンの処理
    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if(timeLeft < 0) {
      clearTimeout(timeoutId);
      alert('Game Over');
    }

  }
  // クリックするとゲームスタート
  window.addEventListener('click', () => {
    updateTarget();
    // 時間経過を指定
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keyup', e => {
    // console.log(e.key);
    // 変数loc番目の文字が、タイプされたキーと同じか判定する
    if (e.key === word[loc]) {
      // console.log('score');
      // 次の文字進める処理（次の文字が打てる）
      loc++;
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      // scoreを増やす
      score++;
      scoreLabel.textContent = score;
      updateTarget();
    } else {
      // console.log('miss');
      miss++;
      missLabel.textContent = miss;
    }
  });
}
