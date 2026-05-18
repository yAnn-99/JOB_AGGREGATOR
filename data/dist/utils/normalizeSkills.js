export function normalizeSkills(skills) {
    return skills.map((skill) => skill.name.toLowerCase());
}
