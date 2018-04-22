;(function (window) {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  const FRAME_RATE = 60;
  const isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  const PARTICLE_NUM = isPhone ? window.innerWidth * 8 : 5000;
  const RADIUS = Math.PI * 2;
  const CANVASWIDTH =  parseInt(window.innerWidth * 0.9);
  const CANVASHEIGHT = parseInt(window.innerHeight / 7);
  const CANVASID = 'canvas';
  const CANVASID2 = 'canvas2';
  let initFlag = false;

  let texts = [
    '蔚蓝星空下', '男孩独自坐望', '星海闪烁', '仿佛在问',
    '为什么你一个人', '我在等一个人', '一个女孩', '这个女孩', '真没什么好的',
    '性格有点善变', '脾气又不好', '还有点公主病', '但男孩觉得', '这都是表面', '在他的眼中',
    '女孩真的很可爱', '可是就是这样的她', '也非常的脆弱',
    '伤心难过的时候', '男孩却不在她身边', '想要做一千件事', '让她开心起来', '却总是放下',
    '已经攥紧的拳头空荡荡', '因为男孩知道', '距离有时候真的很无奈', '那是一条现实的鸿沟',
    '男孩走不近', '只能呆呆望着', '其实他也知道', '这样很傻', '但是放下却做不到', '在鸿沟的另一边',
    '继续等待', '男孩再次抬头', '望向星空', '嘿！女孩', '我能成为你的星星吗', '小小的星光',
    '不过分炙热、不会灼伤你', '让你耍赖、给你依赖', '给你幸福、等待着你',
    '致我最爱的吴宝宝','爱你的江叔'];

  let canvas,canvas2,
    ctx,ctx2,
    particles = [],
    quiver = true,
    text = texts[0],
    textIndex = 0,
    textSize = parseInt(CANVASWIDTH / 12);

  function draw () {
    drawText(ctx);
    // drawText(ctx2);
  }

  function drawText(ctx) {
    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.textBaseline = 'middle'
    ctx.fontWeight = 'bold'
    ctx.font = textSize + 'px \'SimHei\', \'Avenir\', \'Helvetica Neue\', \'Arial\', \'sans-serif\''
    ctx.fillText(text, (CANVASWIDTH - ctx.measureText(text).width) * 0.5, CANVASHEIGHT * 0.5);

    let imgData = ctx.getImageData(0, 0, CANVASWIDTH, CANVASHEIGHT)

    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)

    for (let i = 0, l = particles.length; i < l; i++) {
      let p = particles[i]
      p.inText = false
    }
    particleText(imgData)

    window.requestAnimationFrame(draw)
  }

  function particleText (imgData) {
    // 点坐标获取
    var pxls = []
    for (var w = CANVASWIDTH; w > 0; w -= (isPhone ? 1 : 3)) {
      for (var h = 0; h < CANVASHEIGHT; h += (isPhone ? 1 : 3)) {
        var index = (w + h * (CANVASWIDTH)) * 4
        if (imgData.data[index] > 1) {
          pxls.push([w, h])
        }
      }
    }

    var count = pxls.length
    var j = parseInt((particles.length - pxls.length) / 2, 10)
    j = j < 0 ? 0 : j

    for (var i = 0; i < pxls.length && j < particles.length; i++, j++) {
      try {
        var p = particles[j],
          X,
          Y

        if (quiver) {
          X = (pxls[i - 1][0]) - (p.px + Math.random() * 10)
          Y = (pxls[i - 1][1]) - (p.py + Math.random() * 10)
        } else {
          X = (pxls[i - 1][0]) - p.px
          Y = (pxls[i - 1][1]) - p.py
        }
        var T = Math.sqrt(X * X + Y * Y)
        var A = Math.atan2(Y, X)
        var C = Math.cos(A)
        var S = Math.sin(A)
        p.x = p.px + C * T * p.delta
        p.y = p.py + S * T * p.delta
        p.px = p.x
        p.py = p.y
        p.inText = true
        p.fadeIn()
        p.draw(ctx)
      } catch (e) {}
    }
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i]
      if (!p.inText) {
        p.fadeOut()

        var X = p.mx - p.px
        var Y = p.my - p.py
        var T = Math.sqrt(X * X + Y * Y)
        var A = Math.atan2(Y, X)
        var C = Math.cos(A)
        var S = Math.sin(A)

        p.x = p.px + C * T * p.delta / 2
        p.y = p.py + S * T * p.delta / 2
        p.px = p.x
        p.py = p.y

        p.draw(ctx)
      }
    }
  }

  function setDimensions () {
    setDimensionsCanvas(canvas);
    // setDimensionsCanvas(canvas2);
  }

  function setDimensionsCanvas(canvas) {
    canvas.width = CANVASWIDTH
    canvas.height = CANVASHEIGHT
    canvas.style.position = 'absolute'
    canvas.style.left = '0px'
    canvas.style.top = '0px'
    canvas.style.bottom = '0px'
    canvas.style.right = '0px'
    canvas.style.marginTop = window.innerHeight * .15 + 'px'
  }

  function event () {
    document.addEventListener('click', function (e) {
      textIndex++
      if (textIndex >= texts.length) {
        textIndex--
        return
      }
      text = texts[textIndex]
      console.log(textIndex)
    }, false)

    // document.addEventListener('touchstart', function (e) {
    //   textIndex++
    //   if (textIndex >= texts.length) {
    //     textIndex--
    //     return
    //   }
    //   text = texts[textIndex]
    //   console.log(textIndex)
    // }, false)
  }

  function init () {
    if (initFlag)
      return;
    initFlag = true;
    canvas = document.getElementById(CANVASID)
    // canvas2 = document.getElementById(CANVASID2)
    if (canvas === null || !canvas.getContext) {
      return
    }
    ctx = canvas.getContext('2d');
    // ctx2 = canvas.getContext('2d');
    setDimensions();
    event();

    for (var i = 0; i < PARTICLE_NUM; i++) {
      particles[i] = new Particle(canvas)
    }

    draw()
  }

  class Particle {
    constructor (canvas) {
      let spread = canvas.height
      let size = Math.random() * 1.2
      // 速度
      this.delta = 0.06
      // 现在的位置
      this.x = 0
      this.y = 0
      // 上次的位置
      this.px = Math.random() * canvas.width
      this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread)
      // 记录点最初的位置
      this.mx = this.px;
      this.my = this.py;
      // 点的大小
      this.size = size;
      // this.origSize = size
      // 是否用来显示字
      this.inText = false
      // 透明度相关
      this.opacity = 0;
      this.fadeInRate = 0.4;
      this.fadeOutRate = 0.4;
      this.opacityTresh = 0.98;
      this.fadingOut = true;
      this.fadingIn = true;
    }
    fadeIn () {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true
      if (this.fadingIn) {
        this.opacity += this.fadeInRate
      }else {
        this.opacity = 1
      }
    }
    fadeOut () {
      this.fadingOut = this.opacity < 0 ? false : true
      if (this.fadingOut) {
        this.opacity -= this.fadeOutRate
        if (this.opacity < 0) {
          this.opacity = 0
        }
      }else {
        this.opacity = 0
      }
    }
    draw (ctx) {
      ctx.fillStyle = 'rgba(255,255,160, ' + this.opacity + ')'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, RADIUS, true)
      ctx.closePath()
      ctx.fill()
    }
  }

  // setTimeout(() => {
  //   init()
  // }, 4000);
  // mp3.play()

  let btn = document.querySelector('.comfirm-btn');
  let input4Name = document.querySelector('#input4Name');
  let comfirmWrapper = document.querySelector('.comfirm-wrapper');
  let comfirmTitle = document.querySelector('.comfirm-title');
  let msgInfo = document.querySelector('.msg-info');
  btn.addEventListener('click',function () {
    let inputVal = input4Name.value;
    if (inputVal.indexOf('吴宝宝') > -1){
      init();
      comfirmWrapper.style.display = 'none';
      msgInfo.style.display = 'block';
      setTimeout(()=>{msgInfo.style.display = 'none'},1000);
    }else {
      comfirmTitle.innerText = '你不是我的宝宝';
    }
  });

})(window)
