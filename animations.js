/* GSAP SVG animations for each Git concept */

document.addEventListener("DOMContentLoaded", () => {
  const animations = {
    repo: animateRepo,
    clone: animateClone,
    branch: animateBranch,
    commit: animateCommit,
    pushpull: animatePushPull,
    diff: animateDiff,
    merge: animateMerge,
    rebase: animateRebase,
    conflict: animateConflict,
    pr: animatePR,
    issue: animateIssue,
  };

  Object.entries(animations).forEach(([id, fn]) => {
    const panel = document.getElementById(`anim-${id}`);
    if (!panel) return;

    const tl = fn(panel);
    tl.pause();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.restart();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(panel);

    panel.closest(".concept")?.querySelector(".replay-btn")?.addEventListener("click", () => {
      tl.restart();
    });
  });
});

/* ── 1. Repository ── */
function animateRepo(svg) {
  const folder = svg.querySelector("#repo-folder");
  const files = svg.querySelectorAll(".repo-file");
  const dot = svg.querySelector("#repo-git-dot");

  gsap.set([folder, ...files, dot], { opacity: 0, transformOrigin: "center" });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  tl.to(folder, { opacity: 1, duration: 0.5 })
    .fromTo(folder, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: "back.out(1.7)" })
    .to(files, { opacity: 1, y: 0, stagger: 0.15, duration: 0.3, ease: "power2.out" }, "-=0.1")
    .to(dot, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" })
    .to(dot, { scale: 1.3, duration: 0.6, repeat: 2, yoyo: true, ease: "sine.inOut" });
  return tl;
}

/* ── 2. Clone ── */
function animateClone(svg) {
  const cloud = svg.querySelector("#clone-cloud");
  const laptop = svg.querySelector("#clone-laptop");
  const arrow = svg.querySelector("#clone-arrow");
  const files = svg.querySelectorAll(".clone-file");

  gsap.set(cloud, { opacity: 0, x: -20 });
  gsap.set(laptop, { opacity: 0, x: 20 });
  gsap.set(arrow, { opacity: 0, strokeDashoffset: 60 });
  gsap.set(files, { opacity: 0 });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  tl.to(cloud, { opacity: 1, x: 0, duration: 0.5 })
    .to(laptop, { opacity: 1, x: 0, duration: 0.5 }, "-=0.3")
    .to(arrow, { opacity: 1, strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" })
    .to(files, { opacity: 1, x: 0, stagger: 0.2, duration: 0.4, ease: "power2.out" });
  return tl;
}

/* ── 3. Branch ── */
function animateBranch(svg) {
  const mainLine = svg.querySelector("#branch-main");
  const branchLine = svg.querySelector("#branch-feature");
  const commits = svg.querySelectorAll(".branch-commit");

  gsap.set(mainLine, { strokeDashoffset: 200, strokeDasharray: 200 });
  gsap.set(branchLine, { strokeDashoffset: 120, strokeDasharray: 120, opacity: 0 });
  gsap.set(commits, { scale: 0, transformOrigin: "center" });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  tl.to(mainLine, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" })
    .to(commits[0], { scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.5")
    .to(commits[1], { scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.2")
    .to(branchLine, { opacity: 1, strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" })
    .to(commits[2], { scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.3")
    .to(commits[3], { scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.1");
  return tl;
}

/* ── 4. Commit ── */
function animateCommit(svg) {
  const camera = svg.querySelector("#commit-camera");
  const flash = svg.querySelector("#commit-flash");
  const snapshot = svg.querySelector("#commit-snapshot");
  const label = svg.querySelector("#commit-label");

  gsap.set([camera, snapshot, label], { opacity: 0 });
  gsap.set(flash, { opacity: 0, scale: 0, transformOrigin: "center" });
  gsap.set(snapshot, { scale: 0.5, transformOrigin: "center" });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  tl.to(camera, { opacity: 1, duration: 0.4 })
    .to(flash, { opacity: 0.8, scale: 2, duration: 0.15, ease: "power2.out" })
    .to(flash, { opacity: 0, scale: 3, duration: 0.3 })
    .to(snapshot, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2")
    .to(label, { opacity: 1, duration: 0.3 });
  return tl;
}

/* ── 5. Push / Pull ── */
function animatePushPull(svg) {
  const pushArrow = svg.querySelector("#push-arrow");
  const pullArrow = svg.querySelector("#pull-arrow");
  const local = svg.querySelector("#pp-local");
  const remote = svg.querySelector("#pp-remote");

  gsap.set([local, remote], { opacity: 0 });
  gsap.set(pushArrow, { opacity: 0, x: 0 });
  gsap.set(pullArrow, { opacity: 0, x: 0 });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  tl.to([local, remote], { opacity: 1, duration: 0.4 })
    .to(pushArrow, { opacity: 1, x: 40, duration: 0.8, ease: "power2.inOut" })
    .to(pushArrow, { opacity: 0, duration: 0.2 })
    .set(pushArrow, { x: 0, opacity: 0 })
    .to(pullArrow, { opacity: 1, x: -40, duration: 0.8, ease: "power2.inOut" })
    .to(pullArrow, { opacity: 0, duration: 0.2 });
  return tl;
}

/* ── 6. Diff ── */
function animateDiff(svg) {
  const left = svg.querySelectorAll(".diff-left");
  const right = svg.querySelectorAll(".diff-right");
  const highlight = svg.querySelector("#diff-highlight");

  gsap.set(highlight, { opacity: 0, scaleX: 0, transformOrigin: "left center" });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  tl.fromTo(left, { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.3 })
    .fromTo(right, { opacity: 0, x: 10 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.3 }, "-=0.5")
    .to(highlight, { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out" })
    .to(highlight, { opacity: 0.6, duration: 0.4, repeat: 2, yoyo: true });
  return tl;
}

/* ── 7. Merge ── */
function animateMerge(svg) {
  const feature = svg.querySelector("#merge-feature");
  const main = svg.querySelector("#merge-main");
  const mergeDot = svg.querySelector("#merge-dot");

  gsap.set(feature, { strokeDashoffset: 80, strokeDasharray: 80 });
  gsap.set(main, { strokeDashoffset: 160, strokeDasharray: 160 });
  gsap.set(mergeDot, { scale: 0, transformOrigin: "center" });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  tl.to(main, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" })
    .to(feature, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.5")
    .to(mergeDot, { scale: 1, duration: 0.4, ease: "back.out(2)" })
    .to(mergeDot, { fill: "#e85d04", duration: 0.3 });
  return tl;
}

/* ── 8. Rebase ── */
function animateRebase(svg) {
  const main = svg.querySelector("#rebase-main");
  const oldFeature = svg.querySelector("#rebase-old");
  const newFeature = svg.querySelector("#rebase-new");
  const commits = svg.querySelectorAll(".rebase-commit");

  gsap.set(main, { strokeDashoffset: 200, strokeDasharray: 200 });
  gsap.set(oldFeature, { opacity: 1 });
  gsap.set(newFeature, { strokeDashoffset: 100, strokeDasharray: 100, opacity: 0 });
  gsap.set(commits, { opacity: 0 });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  tl.to(main, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" })
    .to(oldFeature, { opacity: 0.3, duration: 0.4 })
    .to(newFeature, { opacity: 1, strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" })
    .to(commits, { opacity: 1, stagger: 0.15, duration: 0.3 });
  return tl;
}

/* ── 9. Merge Conflict ── */
function animateConflict(svg) {
  const lineA = svg.querySelector(".conflict-line-a");
  const lineB = svg.querySelector(".conflict-line-b");
  const markers = svg.querySelectorAll(".conflict-marker");
  const warning = svg.querySelector("#conflict-warning");

  gsap.set([lineA, lineB], { opacity: 0, x: 0 });
  gsap.set(markers, { opacity: 0 });
  gsap.set(warning, { opacity: 0, scale: 0, transformOrigin: "center" });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  tl.to(lineA, { opacity: 1, x: -5, duration: 0.4, ease: "power2.out" })
    .to(lineB, { opacity: 1, x: 5, duration: 0.4, ease: "power2.out" }, "-=0.2")
    .to(markers, { opacity: 1, stagger: 0.1, duration: 0.3 })
    .to(warning, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" })
    .to(warning, { rotation: 5, duration: 0.1, repeat: 5, yoyo: true });
  return tl;
}

/* ── 10. Pull Request ── */
function animatePR(svg) {
  const branch = svg.querySelector("#pr-branch");
  const arrow = svg.querySelector("#pr-arrow");
  const main = svg.querySelector("#pr-main");
  const badge = svg.querySelector("#pr-badge");

  gsap.set(branch, { strokeDashoffset: 80, strokeDasharray: 80 });
  gsap.set(main, { strokeDashoffset: 120, strokeDasharray: 120 });
  gsap.set(arrow, { opacity: 0, x: -10 });
  gsap.set(badge, { opacity: 0, scale: 0, transformOrigin: "center" });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  tl.to(main, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" })
    .to(branch, { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.3")
    .to(arrow, { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.5)" })
    .to(badge, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" });
  return tl;
}

/* ── 11. Issue ── */
function animateIssue(svg) {
  const board = svg.querySelector("#issue-board");
  const tickets = svg.querySelectorAll(".issue-ticket");
  const plus = svg.querySelector("#issue-plus");

  gsap.set(board, { opacity: 0, y: 10 });
  gsap.set(tickets, { opacity: 0, y: 20, transformOrigin: "center" });
  gsap.set(plus, { opacity: 0, scale: 0, transformOrigin: "center" });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  tl.to(board, { opacity: 1, y: 0, duration: 0.4 })
    .to(tickets, { opacity: 1, y: 0, stagger: 0.2, duration: 0.4, ease: "back.out(1.5)" })
    .to(plus, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" })
    .to(plus, { rotation: 90, duration: 0.3 });
  return tl;
}
