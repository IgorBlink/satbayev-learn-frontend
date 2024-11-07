import React from "react";

const VibrateModule = ({children}) => {
    
    const handleClick = (originalOnClick) => (event) => {
        console.log("vibrate")
        window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(
            window.Telegram?.WebApp.platform === 'ios' ? 'rigid' : 'light'
        );

        if (originalOnClick) {
            originalOnClick(event);
        }
    };

    return React.Children.map(children, child =>
        React.isValidElement(child)
            ? React.cloneElement(child, {
                  onClick: handleClick(child.props.onClick)
              })
            : child
    );
}

export default VibrateModule;
