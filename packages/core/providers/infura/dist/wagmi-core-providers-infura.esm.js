import { providers } from 'ethers';
import { d as defaultInfuraApiKey } from '../../../dist/rpcs-c93e45c2.esm.js';

function infuraProvider() {
  let {
    apiKey = defaultInfuraApiKey,
    priority,
    stallTimeout,
    weight
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (chain) {
    if (!chain.rpcUrls.infura) return null;
    return {
      chain: { ...chain,
        rpcUrls: { ...chain.rpcUrls,
          default: "".concat(chain.rpcUrls.infura, "/").concat(apiKey)
        }
      },
      provider: () => {
        const provider = new providers.InfuraProvider(chain.id, apiKey);
        return Object.assign(provider, {
          priority,
          stallTimeout,
          weight
        });
      },
      webSocketProvider: () => new providers.InfuraWebSocketProvider(chain.id, apiKey)
    };
  };
}

export { infuraProvider };
