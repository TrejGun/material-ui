import type { TokenType } from "@gemunion/types-blockchain";

export interface ITemplateAssetComponent {
  id: number;
  tokenType: TokenType;
  contractId: number;
  contract: {
    id: number;
    title: string;
    address: string;
    decimals: number;
    contractType: TokenType;
    contractFeatures: Array<any>;
  };
  templateId: number;
  template: {
    id: number;
    description: string;
    imageUrl: string;
    title: string;
    imgUrl: string;
    tokens: Array<{
      id: number;
      tokenId: string;
    }>;
  };
  amount: string;
}

export interface ITemplateAsset {
  components: Array<ITemplateAssetComponent>;
}
