"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

/* Logic is the original ContainerScroll. The only additions are the class and
   shadow props below, so the frame can be restyled without editing this file. */

const DEFAULT_CARD_SHADOW =
  "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003";

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
  headerClassName,
  cardClassName,
  screenClassName,
  cardShadow,
  mobileScale = [0.7, 0.9],
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  /** Extra classes for the outer scroll container. */
  className?: string;
  /** Extra classes for the title block above the frame. */
  headerClassName?: string;
  /** Extra classes for the frame (the bezel). */
  cardClassName?: string;
  /** Extra classes for the screen inside the frame. */
  screenClassName?: string;
  /** Box shadow of the frame. Defaults to the original heavy shadow. */
  cardShadow?: string;
  /** Frame scale on phones at the start and end of the scroll. Defaults to the original 0.7 to 0.9. */
  mobileScale?: [number, number];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? mobileScale : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className={cn(
        "h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20",
        className,
      )}
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header
          translate={translate}
          titleComponent={titleComponent}
          className={headerClassName}
        />
        <Card
          rotate={rotate}
          translate={translate}
          scale={scale}
          className={cardClassName}
          screenClassName={screenClassName}
          shadow={cardShadow}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
  className,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className={cn("div max-w-5xl mx-auto text-center", className)}
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  className,
  screenClassName,
  shadow = DEFAULT_CARD_SHADOW,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
  shadow?: string;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: shadow,
      }}
      className={cn(
        "max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl",
        className,
      )}
    >
      <div
        className={cn(
          " h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ",
          screenClassName,
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};
