class BeatMaker {
  constructor() {
    this.playBtn = document.querySelector(".play-btn");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.hihatOpenAudio = document.querySelector(".hihat-open-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.clapAudio = document.querySelector(".clap-sound");
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.bpmSlider = document.querySelector(".bpm-slider");
    this.playBtnIcon = document.querySelector(".fa-play");
    this.stopBtnIcon = document.querySelector(".fa-stop");
    this.icons = document.querySelectorAll(".icons");
    this.clearBtn = document.querySelector(".clear");
    this.par1Btn = document.querySelector(".part-1-toggle");
    this.par2Btn = document.querySelector(".part-2-toggle");
    this.part1 = document.querySelectorAll(".part-1");
    this.part2 = document.querySelectorAll(".part-2");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }
  // Activating the pads
  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 14;
    const activePads = document.querySelectorAll(`.b${step}`);
    if (step >= 7) {
      this.changeToPart2();
    } else {
      this.changeToPart1();
    }
    activePads.forEach((pad) => {
      pad.style.animation = "playTrack 0.3s alternate ease-in-out 2";
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (pad.classList.contains("hihat-open-pad")) {
          this.hihatOpenAudio.currentTime = 0;
          this.hihatOpenAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  // Updating the Play button
  updateBtn() {
    if (this.isPlaying) {
      this.playBtnIcon.style.display = "none";
      this.stopBtnIcon.style.display = "block";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.classList.remove("active");
      this.playBtnIcon.style.display = "block";
      this.stopBtnIcon.style.display = "none";
      this.index = 0;
    }
  }

  changeTrack(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
      case "hihat-open-select":
        this.hihatOpenAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "clap-select":
        this.clapAudio.src = selectionValue;
        break;
    }
  }
  // Muting track and updating the icon
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.children[0].classList.toggle("active");
    e.target.children[1].classList.toggle("active");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.hihatAudio.volume = 0;
          break;
        case "2":
          this.hihatOpenAudio.volume = 0;
          break;
        case "3":
          this.snareAudio.volume = 0;
          break;
        case "4":
          this.clapAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.hihatAudio.volume = 1;
          break;
        case "2":
          this.hihatOpenAudio.volume = 1;
          break;
        case "3":
          this.snareAudio.volume = 1;
          break;
        case "4":
          this.clapAudio.volume = 1;
          break;
      }
    }
  }
  changeBpm(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play-btn");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
  changeBpmText(e) {
    const bpmText = document.querySelector(".bpm-value");
    bpmText.innerText = e.target.value;
  }
  playSound(e) {
    const track = e.target.classList[1];
    switch (track) {
      case "kick-icon":
        this.kickAudio.play();
        this.kickAudio.currentTime = 0;
        break;
      case "hihat-icon":
        this.hihatAudio.play();
        this.hihatAudio.currentTime = 0;
        break;
      case "hihat-open-icon":
        this.hihatOpenAudio.play();
        this.hihatOpenAudio.currentTime = 0;
        break;
      case "snare-icon":
        this.snareAudio.play();
        this.snareAudio.currentTime = 0;
        break;
      case "clap-icon":
        this.clapAudio.play();
        this.clapAudio.currentTime = 0;
        break;
    }
  }
  // Mobile version parts shifting
  changeToPart1() {
    beatMaker.par2Btn.classList.remove("active");
    beatMaker.par1Btn.classList.add("active");
    beatMaker.part1.forEach((div) => {
      div.classList.add("activee");
    });
    beatMaker.part2.forEach((div) => {
      div.classList.remove("activee");
    });
  }
  changeToPart2() {
    beatMaker.par1Btn.classList.remove("active");
    beatMaker.par2Btn.classList.add("active");
    beatMaker.part1.forEach((div) => {
      div.classList.remove("activee");
    });
    beatMaker.part2.forEach((div) => {
      div.classList.add("activee");
    });
  }
}

const beatMaker = new BeatMaker();

//activating the clicked pads
beatMaker.pads.forEach((pad) => {
  pad.addEventListener("click", beatMaker.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

// starting the beat
beatMaker.playBtn.addEventListener("click", () => {
  beatMaker.start();
  beatMaker.updateBtn();
});

beatMaker.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    beatMaker.changeTrack(e);
  });
});

beatMaker.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    beatMaker.mute(e);
  });
});

beatMaker.bpmSlider.addEventListener("input", function (e) {
  beatMaker.changeBpmText(e);
});
beatMaker.bpmSlider.addEventListener("input", function (e) {
  beatMaker.changeBpm(e);
});

beatMaker.icons.forEach((div) => {
  div.addEventListener("click", function (e) {
    beatMaker.playSound(e);
  });
});

beatMaker.clearBtn.addEventListener("click", () => {
  beatMaker.pads.forEach((pad) => {
    pad.classList.remove("active");
  });
});

beatMaker.par1Btn.addEventListener("click", () => {
  beatMaker.changeToPart1();
});

beatMaker.par2Btn.addEventListener("click", () => {
  beatMaker.changeToPart2();
});
