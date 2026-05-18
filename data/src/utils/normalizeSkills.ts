export function normalizeSkills(
  skills: any[]
) {
  return skills.map((skill) =>
    skill.name.toLowerCase()
  );
}