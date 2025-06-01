let isOn = false;
let scheduleInterval;

document.getElementById("toggleBtn").addEventListener("click", function () {
  isOn = !isOn;
  updateStatus();
});

function updateStatus() {
  const status = document.getElementById("status");
  const toggleBtn = document.getElementById("toggleBtn");

  if (isOn) {
    status.textContent = "ON";
    status.style.color = "green";
    toggleBtn.textContent = "Turn OFF";
  } else {
    status.textContent = "OFF";
    status.style.color = "red";
    toggleBtn.textContent = "Turn ON";
  }
}

function setTimer() {
  const seconds = parseInt(document.getElementById("timerInput").value);
  if (isNaN(seconds) || seconds <= 0) {
    alert("Please enter a valid number of seconds.");
    return;
  }

  isOn = true;
  updateStatus();
  setTimeout(() => {
    isOn = false;
    updateStatus();
    alert("Timer complete! Switch turned OFF.");
  }, seconds * 1000);
}

function startSchedule() {
  const onTime = document.getElementById("onTime").value;
  const offTime = document.getElementById("offTime").value;

  if (!onTime || !offTime) {
    alert("Please set both ON and OFF times.");
    return;
  }

  clearInterval(scheduleInterval);
  scheduleInterval = setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().substr(0, 5);

    if (currentTime === onTime) {
      isOn = true;
      updateStatus();
    } else if (currentTime === offTime) {
      isOn = false;
      updateStatus();
    }
  }, 1000);

  alert("Schedule started! Switch will auto ON/OFF at given times.");
}
