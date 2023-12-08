import React from "react";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";
import TitleBlock from "./TitleBlock";
import ContentBlock from "./ContentBlock";
import Content from "@/components/Content";
import Visionaries from "./Visionaries";

const Main: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content>
      <div
        className={cn(
          // "flex flex-col items-center",
          "mx-auto",
          /** 375 */
          // "mx-[20px]",
          /** 768 */
          "md:w-[570px]",
          /** 1024 */
          "lg:w-[840px]"
        )}
      >
        <TitleBlock
          className={cn(
            /** 375 */
            "mt-[12px]",
            /** 768 */
            "md:mt-[26px]",
            /** 1024 */
            "lg:mt-[160px]",
            /** 1440 */
            "xl:mt-[105px]",
            /** 1920 */
            "2xl:mt-[80px]"
          )}
        >
          Who we are?
        </TitleBlock>
        <ContentBlock
          className={cn(
            /** 375 */
            "mt-[26px]",
            /** 768 */
            "md:mt-[48px]"
          )}
        >
          We are Orderly Network, the ultimate destination for decentralized
          trading platforms. We are not satisfied with the limitations of
          centralized exchanges or the complexities of building decentralized
          order books.We aim to make trading easy, fast, and secure for
          everyone. How? By fusing the simplicity of CeFi with the power of
          DeFi.
          <br /> <br />
          At the heart of the issue lies “liquidity”. Builders often grapple
          with a paradox: traders need liquidity, but liquidity demands traders.
          Our solution is simple as is bold –
          <span className="text-primary-100 font-semibold">
            concentrate all liquidity into one order book. One order book that
            connects all the liquidity in the crypto space.
          </span>
          <br /> <br />
          Our ambition doesn't stop there. We're omnichain, championing chain
          abstraction. We envision seamless transactions, where the underlying
          blockchain is merely a detail. By concentrating liquidity, we aim to
          redefine the crypto landscape, making bridging and wrapped assets a
          thing of the past.
          <br /> <br />
          We are Orderly, and we are here to revolutionize DeFi, democratizing
          access to financial opportunities and fostering a fair, equitable
          paradigm for all.
        </ContentBlock>

        <Visionaries />

        <ContentBlock
          className={cn(
            /** 375 */
            "mt-[32px]",
            /** 768 */
            "md:mt-[50px]"
          )}
        >
          Orderly was born from the shortcomings of centralized exchanges and
          the challenges of crafting decentralized order books. Our mission?
          Marry the ease of centralized platforms with the might of
          decentralized trading.
          <br /> <br />
          The crux of the challenge? Liquidity. Builders often find themselves
          caught in a cycle: no traders without liquidity and no liquidity
          without traders. Our solution is bold: concentrate all liquidity into
          one order book.
          <br /> <br />
          Our ambition doesn't stop there. We're omnichain, championing chain
          abstraction. We envision seamless transactions, where the underlying
          blockchain is merely a detail. By concentrating liquidity, we aim to
          redefine the crypto landscape, making bridging and wrapped assets a
          thing of the past.
        </ContentBlock>
      </div>
    </Content>
  );
};

export default Main;
