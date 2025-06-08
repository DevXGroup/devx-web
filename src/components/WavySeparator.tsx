"use client"
import { motion } from "framer-motion"

type WavySeparatorProps = {
  color?: string
  height?: number
  opacity?: number
}

export default function WavySeparator({ color = "#9d4edd", height = 200, opacity = 0.2 }: WavySeparatorProps) {
  const neonGreen = "#4CD787"

  // Helper function to round path values to 3 decimal places
  const roundPathValues = (path: string) => {
    return path.replace(/\d+\.\d+/g, (match) => Math.round(parseFloat(match) * 1000) / 1000 + '')
  }

  // Base wave paths with rounded values
  const wave1Path = roundPathValues("M0,160L48,165C96,170,192,180,288,174.7C384,169,480,149,576,154.7C672,160,768,192,864,197.3C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z")
  const wave2Path = roundPathValues("M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,165.3C672,171,768,181,864,186.7C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z")
  const wave3Path = roundPathValues("M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,170.7C960,160,1056,160,1152,165.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z")
  const wave4Path = roundPathValues("M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,218.7C672,213,768,171,864,165.3C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z")

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: `${height}px`,
        // Adjust mask to hide top edges completely
        maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      {/* Container with extra padding to prevent visible edges */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          padding: "20px 0",
          marginTop: "-40px", // Increased negative margin to hide top edges
          height: `${height + 80}px`, // Increased height to compensate for margin
        }}
      >
        {/* Wave 1 - Bottom wave */}
        <motion.div
          className="absolute inset-0 w-full"
          initial={{ x: "-15%" }}
          animate={{
            x: ["-15%", "15%", "-15%"],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 0,
          }}
        >
          <svg
            viewBox="0 0 1440 320"
            className="absolute w-[130%] left-[-15%]"
            preserveAspectRatio="none"
            style={{
              height: `${height + 80}px`,
              transform: "rotate(180deg)",
            }}
          >
            <motion.path
              fill={color}
              fillOpacity={opacity * 0.9}
              initial={{ d: wave1Path }}
              animate={{
                d: [wave1Path, wave2Path, wave1Path],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0,
              }}
            />
          </svg>
        </motion.div>

        {/* Wave 2 - Middle wave */}
        <motion.div
          className="absolute inset-0 w-full"
          initial={{ x: "10%" }}
          animate={{
            x: ["10%", "-10%", "10%"],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 0,
          }}
        >
          <svg
            viewBox="0 0 1440 320"
            className="absolute w-[130%] left-[-15%]"
            preserveAspectRatio="none"
            style={{
              height: `${height + 80}px`,
              transform: "rotate(180deg)",
            }}
          >
            <motion.path
              fill={color}
              fillOpacity={opacity * 0.7}
              initial={{ d: wave2Path }}
              animate={{
                d: [wave2Path, wave1Path, wave2Path],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0,
              }}
            />
          </svg>
        </motion.div>

        {/* Wave 3 - Neon green accent */}
        <motion.div
          className="absolute inset-0 w-full"
          initial={{ x: "-12%" }}
          animate={{
            x: ["-12%", "12%", "-12%"],
          }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 0,
          }}
        >
          <svg
            viewBox="0 0 1440 320"
            className="absolute w-[130%] left-[-15%]"
            preserveAspectRatio="none"
            style={{
              height: `${height + 80}px`,
              transform: "rotate(180deg)",
            }}
          >
            <motion.path
              fill={neonGreen}
              fillOpacity={0.25}
              initial={{ d: wave3Path }}
              animate={{
                d: [wave3Path, wave4Path, wave3Path],
              }}
              transition={{
                duration: 14,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0,
              }}
            />
          </svg>
        </motion.div>

        {/* Additional neon green wave */}
        <motion.div
          className="absolute inset-0 w-full"
          initial={{ x: "8%" }}
          animate={{
            x: ["8%", "-8%", "8%"],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 0,
          }}
        >
          <svg
            viewBox="0 0 1440 320"
            className="absolute w-[130%] left-[-15%]"
            preserveAspectRatio="none"
            style={{
              height: `${height + 80}px`,
              transform: "rotate(180deg)",
            }}
          >
            <motion.path
              fill={neonGreen}
              fillOpacity={0.2}
              initial={{ d: wave4Path }}
              animate={{
                d: [wave4Path, wave3Path, wave4Path],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0,
              }}
            />
          </svg>
        </motion.div>

        {/* Wave 4 - Top wave */}
        <motion.div
          className="absolute inset-0 w-full"
          initial={{ x: "7%" }}
          animate={{
            x: ["7%", "-7%", "7%"],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 0,
          }}
        >
          <svg
            viewBox="0 0 1440 320"
            className="absolute w-[130%] left-[-15%]"
            preserveAspectRatio="none"
            style={{
              height: `${height + 80}px`,
              transform: "rotate(180deg)",
            }}
          >
            <motion.path
              fill={color}
              fillOpacity={opacity * 0.5}
              initial={{ d: wave4Path }}
              animate={{
                d: [wave4Path, wave3Path, wave4Path],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0,
              }}
            />
          </svg>
        </motion.div>

        {/* Enhanced shadow effects */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: "450px",
            boxShadow: `0 -15px 30px ${color}`,
            opacity: opacity * 0.7,
          }}
        />

        {/* Enhanced green glow */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: "35px",
            boxShadow: `0 -8px 20px ${neonGreen}`,
            opacity: 0.18,
          }}
        />

        {/* Additional green glow */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: "25px",
            boxShadow: `0 -5px 15px ${neonGreen}`,
            opacity: 0.12,
          }}
        />
      </div>
    </div>
  )
}
