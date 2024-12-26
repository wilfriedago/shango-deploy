import { execSync } from 'node:child_process';

export function executeKamal(command: string) {
  const baseCommand = 'docker run --rm ' +
    '-v "${PWD}:/workdir" ' +
    '-v "${SSH_AUTH_SOCK}:/ssh-agent" ' +
    '-v /var/run/docker.sock:/var/run/docker.sock ' +
    'ghcr.io/basecamp/kamal:latest';

  try {
    const output = execSync(`${baseCommand} ${command}`, {
      encoding: 'utf8',
      shell: '/bin/bash',
      env: { ...process.env }
    });
    return output;
  } catch (error: any) {
    throw new Error(`Kamal command failed: ${error.message}`);
  }
}
