export function scoreJob(user, job) {
    let score = 0;
    for (const skill of user.skills) {
        if (job.skills.includes(skill.toLowerCase())) {
            score += 20;
        }
    }
    if (user.remote && job.remote) {
        score += 10;
    }
    return score;
}
