// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract LimitOrder {
    ISwapRouter public immutable swapRouter;
    IUniswapV3Factory public immutable factory;
    address public owner;

    struct Order {
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 amountOutMin;
        uint256 priceLimit;
        address recipient;
        bool executed;
    }

    Order[] public orders;

    constructor(ISwapRouter _swapRouter, IUniswapV3Factory _factory) {
        swapRouter = _swapRouter;
        factory = _factory;
        owner = msg.sender;
    }

    function createOrder(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        uint256 priceLimit,
        address recipient
    ) external returns (uint256 orderId) {
        require(msg.sender == owner, "Only owner can create orders");

        orders.push(
            Order({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                amountIn: amountIn,
                amountOutMin: amountOutMin,
                priceLimit: priceLimit,
                recipient: recipient,
                executed: false
            })
        );

        return orders.length - 1;
    }

    function executeOrder(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(!order.executed, "Order already executed");
        require(checkPrice(order.tokenIn, order.tokenOut) >= order.priceLimit, "Price limit not reached");

        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: order.tokenIn,
                tokenOut: order.tokenOut,
                fee: 3000,
                recipient: order.recipient,
                deadline: block.timestamp + 15,
                amountIn: order.amountIn,
                amountOutMinimum: order.amountOutMin,
                sqrtPriceLimitX96: 0
            });

        swapRouter.exactInputSingle(params);
        order.executed = true;
    }

    function checkPrice(address tokenIn, address tokenOut) public view returns (uint256 price) {
        address poolAddress = factory.getPool(tokenIn, tokenOut, 3000);
        require(poolAddress != address(0), "Pool does not exist");

        IUniswapV3Pool pool = IUniswapV3Pool(poolAddress);
        (uint160 sqrtPriceX96,,,,,,) = pool.slot0();
        price = uint256(sqrtPriceX96) ** 2 / (2 ** 192);
    }
}