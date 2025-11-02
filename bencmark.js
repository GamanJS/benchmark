import autocannon from "autocannon";
import chalk from "chalk";
import fs from "fs";

const targets = [
  // { name: "Express", url: "http://localhost:3001/json" },
  { name: "NestJS", url: "http://localhost:3000" },
  // { name: "AdonisJS", url: "http://localhost:3333" },
  // { name: "HonoJS", url: "http://localhost:3001" },
  { name: "GamanJS", url: "http://localhost:3431" },
];

async function runBenchmark(target) {
  console.log(chalk.cyan(`🚀 Benchmarking ${target.name}...`));
  const result = await autocannon({
    url: target.url,
    connections: 100,
    duration: 10,
  });

  const stats = {
    name: target.name,
    rps: {
      avg: result.requests.average,
      min: result.requests.min,
      max: result.requests.max,
      total: result.requests.total,
    },
    latency: {
      avg: result.latency.average,
      p50: result.latency.p50,
      p95: result.latency.p95,
      p99: result.latency.p99,
    },
    throughput: {
      avg: (result.throughput.average / 1024 / 1024).toFixed(2) + " MB/s",
      total: (result.throughput.total / 1024 / 1024).toFixed(2) + " MB",
    },
    errors: result.errors,
    timeouts: result.timeouts,
  };

  console.log(
    chalk.green(
      `✅ ${target.name}: ${stats.rps.avg.toFixed(0)} req/s | ` +
        `${stats.latency.avg.toFixed(2)} ms avg | ` +
        `${stats.throughput.avg} | ` +
        `Errors: ${stats.errors}, Timeouts: ${stats.timeouts}`
    )
  );

  console.log(
    chalk.gray(
      `   ↳ Latency: p50=${stats.latency.p50}ms, p95=${stats.latency.p95}ms, p99=${stats.latency.p99}ms`
    )
  );

  console.log(
    chalk.gray(
      `   ↳ RPS: min=${stats.rps.min}, max=${stats.rps.max}, total=${stats.rps.total}`
    )
  );

  console.log(
    chalk.gray(`   ↳ Throughput Total: ${stats.throughput.total}`)
  );

  return stats;
}

async function main() {
  console.log(chalk.yellow("=== GamanJS vs NestJS vs Express ===\n"));

  const results = [];
  for (const t of targets) {
    const stats = await runBenchmark(t);
    results.push(stats);
    console.log("");
  }

  console.log(chalk.magenta("🏁 Benchmark Summary:\n"));
  results
    .sort((a, b) => b.rps.avg - a.rps.avg)
    .forEach((r, i) => {
      console.log(
        `${i + 1}. ${chalk.bold(r.name)} — ${r.rps.avg.toFixed(0)} req/s | ` +
          `${r.latency.avg.toFixed(2)} ms avg | ${r.throughput.avg} | ` +
          `Errors: ${r.errors}`
      );
    });

  // Save results to JSON file
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputFile = `benchmark-result-${timestamp}.json`;
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(
    chalk.blueBright(`\n📁 Hasil detail tersimpan di: ${outputFile}\n`)
  );
}

main().catch(console.error);
