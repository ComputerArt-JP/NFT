let balls = []; // ボールを格納する配列
let numBalls = 30; // 初期値：ボールの数
let canvasWidth = 1280;
let canvasHeight = 720;
let radius = 20; // ボールの半径
let interval = 100; // 処理周期（ms）
let lastUpdateTime = 0; // 最後の更新時刻
let ballCanvas; // ボールを描画するグラフィックバッファ
let music; // 音楽ファイル

function preload() {
    // abc.mp3 をロード
    music = loadSound('alarm.mp3');
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background("#CCCCCC"); // 背景色を #CCCCCC に設定

    // 音楽を再生
    music.loop();

    // グラフィックバッファを作成してボールを描画
    ballCanvas = createGraphics(canvasWidth, canvasHeight);
    ballCanvas.clear(); // 背景を透明に

    // ボールを初期化
    for (let i = 0; i < numBalls; i++) {
        let angle = random(TWO_PI); // ランダムな方向（角度）
        let speed = 3 * random(8, 15); // スピードを3倍に
        balls.push({
            x: canvasWidth / 2,
            y: canvasHeight / 2,
            dx: cos(angle) * speed, // X方向の速度
            dy: sin(angle) * speed, // Y方向の速度
            color: color(random(255), random(255), random(255)) // ランダムな色
        });
    }

    // ボールを最初に描画
    for (let ball of balls) {
        ballCanvas.fill(ball.color);
        ballCanvas.noStroke();
        ballCanvas.ellipse(ball.x, ball.y, radius * 2);
    }
}

function draw() {
    background("#CCCCCC"); // 背景を再描画
    image(ballCanvas, 0, 0); // ボールのバッファを表示

    // 現在の時刻を取得
    let currentTime = millis();

    // 一定間隔でボールを更新
    if (currentTime - lastUpdateTime >= interval) {
        updateBalls();
        lastUpdateTime = currentTime;
    }
}

function updateBalls() {
    ballCanvas.clear(); // ボールキャンバスをクリア

    for (let ball of balls) {
        // ボールを移動
        ball.x += ball.dx;
        ball.y += ball.dy;

        // 壁に当たったら反射
        if (ball.x - radius <= 0 || ball.x + radius >= canvasWidth) {
            ball.dx *= -1;
        }
        if (ball.y - radius <= 0 || ball.y + radius >= canvasHeight) {
            ball.dy *= -1;
        }

        // 更新された位置でボールを再描画
        ballCanvas.fill(ball.color);
        ballCanvas.noStroke();
        ballCanvas.ellipse(ball.x, ball.y, radius * 2);
    }
}
